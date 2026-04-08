#!/usr/bin/env bash
# =============================================================================
# Funnel Flow AI - Agent Runner
# =============================================================================
# Main entry point for the FunnelFlow AI autonomous funnel builder.
# This script manages the agent lifecycle: read state, execute, write state,
# report. The actual intelligence comes from Claude Code interpreting the
# playbook -- this script just orchestrates the run.
#
# Usage:
#   ./scripts/run-agent.sh <command> [options]
#
# Commands:
#   build     - Build a funnel from the queue (browser automation via GHL)
#   queue     - Process and prioritize the funnel build queue
#   qa        - Run QA checks on recently built funnels
#   catalog   - Update the funnel template catalog
#   health    - System health check (state files, configs, connectivity)
#   status    - Print current agent status and recent activity
#
# Environment:
#   GHL_LOCATION_ID   - Go High Level location (default: Fk0BkQ526NRxmsgT6LhH)
#   SLACK_CHANNEL      - Slack channel for reports (default: funnel-flow-ai)
#   DRY_RUN            - Set to "true" to skip writes and external calls
#   VERBOSE            - Set to "true" for debug-level logging
# =============================================================================

set -euo pipefail

# ---------------------------------------------------------------------------
# Path Setup
# ---------------------------------------------------------------------------
# Auto-detect repo root from script location (works with symlinks)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

STATE_DIR="$REPO_ROOT/state"
CONFIG_DIR="$REPO_ROOT/config"
LOG_DIR="$REPO_ROOT/logs"
PLAYBOOK="$REPO_ROOT/playbooks/funnel-builder.md"
LOCK_FILE="/tmp/funnelflow-agent.lock"

# Ensure log directory exists
mkdir -p "$LOG_DIR"

# Run log -- every run gets appended here
RUN_LOG="$LOG_DIR/agent-$(date +%Y-%m-%d).log"

# ---------------------------------------------------------------------------
# Environment Defaults
# ---------------------------------------------------------------------------
GHL_LOCATION_ID="${GHL_LOCATION_ID:-Fk0BkQ526NRxmsgT6LhH}"
SLACK_CHANNEL="${SLACK_CHANNEL:-funnel-flow-ai}"
DRY_RUN="${DRY_RUN:-false}"
VERBOSE="${VERBOSE:-false}"
RUN_ID="run-$(date +%Y%m%d-%H%M%S)-$$"
RUN_START_TS="$(date +%s)"

# ---------------------------------------------------------------------------
# Color Helpers
# ---------------------------------------------------------------------------
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m' # No Color

# ---------------------------------------------------------------------------
# Logging
# ---------------------------------------------------------------------------
_log() {
    local level="$1"
    local color="$2"
    shift 2
    local ts
    ts="$(date '+%Y-%m-%d %H:%M:%S')"
    local msg="[$ts] [$level] $*"
    # Always write to log file (strip color)
    echo "$msg" >> "$RUN_LOG"
    # Print to stdout with color
    echo -e "${color}${msg}${NC}"
}

log_info()  { _log "INFO"  "$CYAN"   "$@"; }
log_ok()    { _log "OK"    "$GREEN"  "$@"; }
log_warn()  { _log "WARN"  "$YELLOW" "$@"; }
log_error() { _log "ERROR" "$RED"    "$@"; }
log_debug() {
    if [[ "$VERBOSE" == "true" ]]; then
        _log "DEBUG" "$BLUE" "$@"
    fi
}

log_header() {
    local msg="$1"
    echo "" >> "$RUN_LOG"
    echo "=== $msg ===" >> "$RUN_LOG"
    echo ""
    echo -e "${BOLD}${CYAN}=== $msg ===${NC}"
    echo ""
}

# ---------------------------------------------------------------------------
# Lock File (prevent concurrent runs)
# ---------------------------------------------------------------------------
acquire_lock() {
    if [[ -f "$LOCK_FILE" ]]; then
        local lock_pid
        lock_pid="$(cat "$LOCK_FILE" 2>/dev/null || echo "")"
        # Check if the process that created the lock is still running
        if [[ -n "$lock_pid" ]] && kill -0 "$lock_pid" 2>/dev/null; then
            log_error "Another agent run is in progress (PID $lock_pid). Lock file: $LOCK_FILE"
            log_error "If this is stale, remove it manually: rm $LOCK_FILE"
            exit 1
        else
            log_warn "Stale lock file found (PID $lock_pid no longer running). Removing."
            rm -f "$LOCK_FILE"
        fi
    fi
    echo "$$" > "$LOCK_FILE"
    log_debug "Lock acquired (PID $$)"
}

release_lock() {
    rm -f "$LOCK_FILE"
    log_debug "Lock released"
}

# ---------------------------------------------------------------------------
# Error Trap and Cleanup
# ---------------------------------------------------------------------------
cleanup() {
    local exit_code=$?
    if [[ $exit_code -ne 0 ]]; then
        log_error "Agent run failed with exit code $exit_code"
        # Write failure state so the next run knows what happened
        write_failure_state "$exit_code"
        # Attempt Slack notification on failure (best-effort)
        if [[ "$DRY_RUN" != "true" ]]; then
            post_to_slack "FAILED" "Agent run '$COMMAND' failed (exit $exit_code). Check logs: $RUN_LOG" || true
        fi
    fi
    release_lock
    local run_end_ts
    run_end_ts="$(date +%s)"
    local duration=$(( run_end_ts - RUN_START_TS ))
    log_info "Run $RUN_ID finished in ${duration}s (exit $exit_code)"
}

trap cleanup EXIT

# ---------------------------------------------------------------------------
# Usage / Help
# ---------------------------------------------------------------------------
usage() {
    cat <<'HELP'
Funnel Flow AI - Agent Runner

USAGE:
    ./scripts/run-agent.sh <command> [options]

COMMANDS:
    build       Build a funnel from the queue (browser automation via GHL)
    queue       Process and prioritize the funnel build queue
    qa          Run QA checks on recently built funnels
    catalog     Update the funnel template catalog
    health      System health check (state files, configs, connectivity)
    status      Print current agent status and recent activity

OPTIONS:
    -h, --help      Show this help message
    -v, --verbose   Enable debug-level logging
    -n, --dry-run   Skip all writes and external calls (read-only mode)

ENVIRONMENT VARIABLES:
    GHL_LOCATION_ID   GHL location ID (default: Fk0BkQ526NRxmsgT6LhH)
    SLACK_CHANNEL     Slack channel for reports (default: funnel-flow-ai)
    DRY_RUN           "true" to skip writes (same as -n)
    VERBOSE           "true" for debug logging (same as -v)

EXAMPLES:
    ./scripts/run-agent.sh health
    ./scripts/run-agent.sh build --verbose
    DRY_RUN=true ./scripts/run-agent.sh queue

LIFECYCLE:
    1. Acquire lock (prevent concurrent runs)
    2. Validate environment and state files
    3. Read playbook and current state
    4. Execute the requested command
    5. Write updated state files
    6. Post summary to Slack
    7. Release lock and exit

FILES:
    playbooks/funnel-builder.md       Agent playbook (the brain)
    state/funnel-builder/             Persistent state between runs
    config/schedules.json             Cron schedules
    config/thresholds.json            Budget and rate limits
    logs/agent-YYYY-MM-DD.log         Daily run logs
HELP
    exit 0
}

# ---------------------------------------------------------------------------
# State File Helpers
# ---------------------------------------------------------------------------

# Validate that required state and config files exist.
# Creates missing directories but does NOT create files -- those are the
# responsibility of an init/setup step.
validate_state_files() {
    log_info "Validating state files and configuration..."

    local missing=0

    # Required directories
    for dir in "$STATE_DIR/funnel-builder" "$CONFIG_DIR" "$LOG_DIR"; do
        if [[ ! -d "$dir" ]]; then
            log_warn "Creating missing directory: $dir"
            mkdir -p "$dir"
        fi
    done

    # Required config files
    for cfg in "$CONFIG_DIR/schedules.json" "$CONFIG_DIR/thresholds.json"; do
        if [[ ! -f "$cfg" ]]; then
            log_warn "Missing config file: $cfg"
            missing=$((missing + 1))
        else
            # Validate it is parseable JSON
            if ! python3 -c "import json; json.load(open('$cfg'))" 2>/dev/null; then
                log_error "Invalid JSON in config file: $cfg"
                missing=$((missing + 1))
            fi
        fi
    done

    # Playbook
    if [[ ! -f "$PLAYBOOK" ]]; then
        log_warn "Playbook not found: $PLAYBOOK"
        missing=$((missing + 1))
    fi

    # State file (last-run.json) -- warn but do not fail (first run)
    local last_run="$STATE_DIR/funnel-builder/last-run.json"
    if [[ ! -f "$last_run" ]]; then
        log_warn "No last-run state found (first run?): $last_run"
    else
        if ! python3 -c "import json; json.load(open('$last_run'))" 2>/dev/null; then
            log_error "Corrupted last-run state: $last_run"
            missing=$((missing + 1))
        fi
    fi

    if [[ $missing -gt 0 ]]; then
        log_warn "$missing file(s) missing or invalid. Some operations may fail."
    else
        log_ok "All state files and configs validated."
    fi

    return 0
}

# Read current state into environment-visible variables.
# Sets: LAST_RUN_TS, LAST_RUN_STATUS, LAST_RUN_COMMAND, BUILDS_TODAY
read_state() {
    log_info "Reading current state..."

    local last_run="$STATE_DIR/funnel-builder/last-run.json"
    if [[ -f "$last_run" ]]; then
        LAST_RUN_TS="$(python3 -c "import json; d=json.load(open('$last_run')); print(d.get('timestamp','unknown'))" 2>/dev/null || echo "unknown")"
        LAST_RUN_STATUS="$(python3 -c "import json; d=json.load(open('$last_run')); print(d.get('status','unknown'))" 2>/dev/null || echo "unknown")"
        LAST_RUN_COMMAND="$(python3 -c "import json; d=json.load(open('$last_run')); print(d.get('command','unknown'))" 2>/dev/null || echo "unknown")"
        BUILDS_TODAY="$(python3 -c "import json; d=json.load(open('$last_run')); print(d.get('builds_today',0))" 2>/dev/null || echo "0")"
        log_debug "Last run: $LAST_RUN_COMMAND at $LAST_RUN_TS ($LAST_RUN_STATUS), builds today: $BUILDS_TODAY"
    else
        LAST_RUN_TS="never"
        LAST_RUN_STATUS="none"
        LAST_RUN_COMMAND="none"
        BUILDS_TODAY="0"
        log_debug "No previous run state found."
    fi

    # Read thresholds for rate limiting
    local thresholds="$CONFIG_DIR/thresholds.json"
    if [[ -f "$thresholds" ]]; then
        MAX_BUILDS_PER_RUN="$(python3 -c "import json; d=json.load(open('$thresholds')); print(d.get('funnel_builder',{}).get('max_builds_per_run',2))" 2>/dev/null || echo "2")"
        MAX_BUILDS_PER_DAY="$(python3 -c "import json; d=json.load(open('$thresholds')); print(d.get('funnel_builder',{}).get('max_builds_per_day',4))" 2>/dev/null || echo "4")"
    else
        MAX_BUILDS_PER_RUN=2
        MAX_BUILDS_PER_DAY=4
    fi
    log_debug "Thresholds: max $MAX_BUILDS_PER_RUN/run, $MAX_BUILDS_PER_DAY/day"
}

# Write state after a successful run.
# Args: $1 = status (ok|warn|error), $2 = summary message
write_state() {
    local status="${1:-ok}"
    local summary="${2:-Run completed}"

    if [[ "$DRY_RUN" == "true" ]]; then
        log_info "[DRY RUN] Would write state: status=$status"
        return 0
    fi

    local state_file="$STATE_DIR/funnel-builder/last-run.json"
    local now
    now="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

    python3 -c "
import json, os

state_file = '$state_file'
# Preserve existing state and merge
existing = {}
if os.path.exists(state_file):
    try:
        with open(state_file) as f:
            existing = json.load(f)
    except:
        pass

existing.update({
    'run_id': '$RUN_ID',
    'timestamp': '$now',
    'command': '$COMMAND',
    'status': '$status',
    'summary': $(python3 -c "import json; print(json.dumps('$summary'))"),
    'builds_today': int('${BUILDS_TODAY:-0}'),
    'ghl_location': '$GHL_LOCATION_ID',
    'dry_run': $( [[ "$DRY_RUN" == "true" ]] && echo "True" || echo "False" )
})

with open(state_file, 'w') as f:
    json.dump(existing, f, indent=2)
"

    log_ok "State written to $state_file"
}

# Write a minimal failure state so the next run knows what happened.
write_failure_state() {
    local exit_code="${1:-1}"
    if [[ "$DRY_RUN" == "true" ]]; then return 0; fi

    local state_file="$STATE_DIR/funnel-builder/last-run.json"
    mkdir -p "$(dirname "$state_file")"

    local now
    now="$(date -u +%Y-%m-%dT%H:%M:%SZ)"

    python3 -c "
import json, os

state_file = '$state_file'
existing = {}
if os.path.exists(state_file):
    try:
        with open(state_file) as f:
            existing = json.load(f)
    except:
        pass

existing.update({
    'run_id': '$RUN_ID',
    'timestamp': '$now',
    'command': '${COMMAND:-unknown}',
    'status': 'error',
    'exit_code': $exit_code,
    'summary': 'Run failed with exit code $exit_code'
})

with open(state_file, 'w') as f:
    json.dump(existing, f, indent=2)
" 2>/dev/null || true
}

# ---------------------------------------------------------------------------
# Slack Reporting
# ---------------------------------------------------------------------------
post_to_slack() {
    local status="$1"
    local message="$2"

    if [[ "$DRY_RUN" == "true" ]]; then
        log_info "[DRY RUN] Would post to Slack #$SLACK_CHANNEL: [$status] $message"
        return 0
    fi

    # This is a placeholder for the actual Slack integration.
    # In production, Claude Code calls the Slack MCP tool directly.
    # This function exists so the script can be tested standalone.
    log_info "Slack report (#$SLACK_CHANNEL): [$status] $message"

    # If 'claude' CLI is available, we could pipe a prompt to it.
    # For now, just log the intent -- Claude Code reads this log.
    local slack_log="$STATE_DIR/funnel-builder/slack-queue.json"
    python3 -c "
import json, os
from datetime import datetime

queue_file = '$slack_log'
queue = []
if os.path.exists(queue_file):
    try:
        with open(queue_file) as f:
            queue = json.load(f)
    except:
        queue = []

queue.append({
    'timestamp': datetime.utcnow().isoformat() + 'Z',
    'channel': '$SLACK_CHANNEL',
    'status': '$status',
    'message': $(python3 -c "import json; print(json.dumps('$message'))"),
    'run_id': '$RUN_ID',
    'delivered': False
})

# Keep last 50 messages
queue = queue[-50:]

with open(queue_file, 'w') as f:
    json.dump(queue, f, indent=2)
" 2>/dev/null || log_warn "Failed to queue Slack message"
}

# ---------------------------------------------------------------------------
# Rate Limit Check
# ---------------------------------------------------------------------------
check_rate_limits() {
    if [[ "$COMMAND" == "build" ]]; then
        if (( BUILDS_TODAY >= MAX_BUILDS_PER_DAY )); then
            log_error "Daily build limit reached ($BUILDS_TODAY/$MAX_BUILDS_PER_DAY). Try again tomorrow."
            exit 1
        fi
        log_info "Build rate OK: $BUILDS_TODAY/$MAX_BUILDS_PER_DAY today"
    fi
}

# ---------------------------------------------------------------------------
# Command Implementations
# ---------------------------------------------------------------------------
# Each command function sets up context and prints what Claude Code should do.
# The actual work happens when Claude reads the playbook and state.

cmd_build() {
    log_header "FUNNEL BUILD"
    check_rate_limits

    log_info "Command: build"
    log_info "GHL Location: $GHL_LOCATION_ID"
    log_info "Playbook: $PLAYBOOK"
    log_info "Max builds this run: $MAX_BUILDS_PER_RUN"
    log_info "Builds so far today: $BUILDS_TODAY"
    echo ""
    log_info "Claude Code should now:"
    log_info "  1. Read the playbook at $PLAYBOOK"
    log_info "  2. Read the build queue at $STATE_DIR/funnel-builder/build-queue.json"
    log_info "  3. Pick the highest-priority item"
    log_info "  4. Open GHL via browser automation"
    log_info "  5. Build the funnel per template spec"
    log_info "  6. Run basic QA on the built funnel"
    log_info "  7. Update the queue and state files"

    # The script itself does not drive browser automation.
    # It prepares the environment so Claude Code can take over.
    write_state "ok" "Build run initialized. Awaiting Claude Code execution."
    post_to_slack "STARTED" "Build run $RUN_ID started. Queue position: next in line."
}

cmd_queue() {
    log_header "QUEUE MANAGEMENT"

    log_info "Command: queue"
    log_info "Queue file: $STATE_DIR/funnel-builder/build-queue.json"
    echo ""
    log_info "Claude Code should now:"
    log_info "  1. Read the current queue"
    log_info "  2. Check for new funnel requests (ClickUp, Slack, email)"
    log_info "  3. Prioritize by urgency and client tier"
    log_info "  4. Write the updated queue"
    log_info "  5. Report queue status"

    write_state "ok" "Queue management initialized."
    post_to_slack "STARTED" "Queue processing run $RUN_ID started."
}

cmd_qa() {
    log_header "QA CHECK"

    log_info "Command: qa"
    log_info "Checking recently built funnels for issues..."
    echo ""
    log_info "Claude Code should now:"
    log_info "  1. Read the list of recently built funnels from state"
    log_info "  2. Open each funnel URL in browser"
    log_info "  3. Check: page loads, forms work, tracking fires, mobile responsive"
    log_info "  4. Screenshot any issues"
    log_info "  5. Write QA report to state"
    log_info "  6. Flag failures for rebuild"

    write_state "ok" "QA check initialized."
    post_to_slack "STARTED" "QA check run $RUN_ID started."
}

cmd_catalog() {
    log_header "TEMPLATE CATALOG UPDATE"

    log_info "Command: catalog"
    log_info "Template registry: $STATE_DIR/funnel-builder/template-registry.json"
    echo ""
    log_info "Claude Code should now:"
    log_info "  1. Read current template registry"
    log_info "  2. Scan GHL for available templates"
    log_info "  3. Catalog new templates with metadata"
    log_info "  4. Update the registry file"
    log_info "  5. Report changes"

    write_state "ok" "Catalog update initialized."
    post_to_slack "STARTED" "Catalog update run $RUN_ID started."
}

cmd_health() {
    log_header "SYSTEM HEALTH CHECK"

    local issues=0

    # Check state directory
    if [[ -d "$STATE_DIR/funnel-builder" ]]; then
        local file_count
        file_count=$(find "$STATE_DIR/funnel-builder" -name "*.json" 2>/dev/null | wc -l | tr -d ' ')
        log_ok "State directory exists ($file_count JSON files)"
    else
        log_error "State directory missing: $STATE_DIR/funnel-builder"
        issues=$((issues + 1))
    fi

    # Check config files
    for cfg in schedules.json thresholds.json; do
        if [[ -f "$CONFIG_DIR/$cfg" ]]; then
            if python3 -c "import json; json.load(open('$CONFIG_DIR/$cfg'))" 2>/dev/null; then
                log_ok "Config valid: $cfg"
            else
                log_error "Config invalid JSON: $cfg"
                issues=$((issues + 1))
            fi
        else
            log_warn "Config missing: $cfg"
            issues=$((issues + 1))
        fi
    done

    # Check playbook
    if [[ -f "$PLAYBOOK" ]]; then
        local lines
        lines=$(wc -l < "$PLAYBOOK" | tr -d ' ')
        log_ok "Playbook exists ($lines lines)"
    else
        log_error "Playbook missing: $PLAYBOOK"
        issues=$((issues + 1))
    fi

    # Check last run
    local last_run="$STATE_DIR/funnel-builder/last-run.json"
    if [[ -f "$last_run" ]]; then
        log_ok "Last run: $LAST_RUN_COMMAND at $LAST_RUN_TS ($LAST_RUN_STATUS)"
    else
        log_warn "No previous run recorded."
    fi

    # Check lock file
    if [[ -f "$LOCK_FILE" ]]; then
        log_warn "Lock file exists: $LOCK_FILE (PID: $(cat "$LOCK_FILE" 2>/dev/null || echo 'unreadable'))"
    else
        log_ok "No stale lock files."
    fi

    # Check disk space (warn if <1GB free)
    local free_mb
    free_mb=$(df -m "$REPO_ROOT" | awk 'NR==2{print $4}')
    if (( free_mb < 1024 )); then
        log_warn "Low disk space: ${free_mb}MB free"
        issues=$((issues + 1))
    else
        log_ok "Disk space: ${free_mb}MB free"
    fi

    echo ""
    if [[ $issues -eq 0 ]]; then
        log_ok "Health check passed. All systems nominal."
        write_state "ok" "Health check passed. 0 issues."
    else
        log_warn "Health check completed with $issues issue(s)."
        write_state "warn" "Health check found $issues issue(s)."
    fi
}

cmd_status() {
    log_header "AGENT STATUS"

    echo -e "${BOLD}Run ID:${NC}          $RUN_ID"
    echo -e "${BOLD}Repo Root:${NC}       $REPO_ROOT"
    echo -e "${BOLD}GHL Location:${NC}    $GHL_LOCATION_ID"
    echo -e "${BOLD}Slack Channel:${NC}   #$SLACK_CHANNEL"
    echo -e "${BOLD}Dry Run:${NC}         $DRY_RUN"
    echo ""
    echo -e "${BOLD}Last Run:${NC}"
    echo -e "  Command:       $LAST_RUN_COMMAND"
    echo -e "  Timestamp:     $LAST_RUN_TS"
    echo -e "  Status:        $LAST_RUN_STATUS"
    echo -e "  Builds Today:  $BUILDS_TODAY / $MAX_BUILDS_PER_DAY"
    echo ""

    # Show queue summary if it exists
    local queue="$STATE_DIR/funnel-builder/build-queue.json"
    if [[ -f "$queue" ]]; then
        local queue_count
        queue_count=$(python3 -c "import json; d=json.load(open('$queue')); print(len(d) if isinstance(d,list) else len(d.get('items',[])))" 2>/dev/null || echo "?")
        echo -e "${BOLD}Build Queue:${NC}     $queue_count item(s)"
    else
        echo -e "${BOLD}Build Queue:${NC}     (no queue file)"
    fi

    # Show recent log entries
    echo ""
    echo -e "${BOLD}Recent Log (last 10 lines):${NC}"
    if [[ -f "$RUN_LOG" ]]; then
        tail -10 "$RUN_LOG" 2>/dev/null || echo "  (empty)"
    else
        echo "  (no log for today)"
    fi
}

# ---------------------------------------------------------------------------
# Argument Parsing
# ---------------------------------------------------------------------------
COMMAND=""

while [[ $# -gt 0 ]]; do
    case "$1" in
        build|queue|qa|catalog|health|status)
            COMMAND="$1"
            shift
            ;;
        -h|--help)
            usage
            ;;
        -v|--verbose)
            VERBOSE="true"
            shift
            ;;
        -n|--dry-run)
            DRY_RUN="true"
            shift
            ;;
        *)
            log_error "Unknown argument: $1"
            echo ""
            usage
            ;;
    esac
done

if [[ -z "$COMMAND" ]]; then
    log_error "No command specified."
    echo ""
    usage
fi

# ---------------------------------------------------------------------------
# Main Execution
# ---------------------------------------------------------------------------
log_header "FunnelFlow AI Agent - $COMMAND"
log_info "Run ID:    $RUN_ID"
log_info "Repo Root: $REPO_ROOT"
log_info "Command:   $COMMAND"
log_info "Dry Run:   $DRY_RUN"
log_info "Verbose:   $VERBOSE"

# Step 1: Acquire lock
acquire_lock

# Step 2: Validate environment
validate_state_files

# Step 3: Read current state
read_state

# Step 4: Dispatch command
case "$COMMAND" in
    build)    cmd_build   ;;
    queue)    cmd_queue   ;;
    qa)       cmd_qa      ;;
    catalog)  cmd_catalog ;;
    health)   cmd_health  ;;
    status)   cmd_status  ;;
    *)
        log_error "Unknown command: $COMMAND"
        exit 1
        ;;
esac

# Step 5: Final state write is handled by each command.
# Step 6: Slack report is handled by each command.
# Step 7: Lock release happens in the cleanup trap.

log_ok "Agent run $RUN_ID completed successfully."
