# render.ps1 — regenerate dark-timeline.svg from the editor spec or a custom JSON file
# Usage:
#   .\render.ps1                        # re-render from DEFAULT_SPEC in dark_timeline_editor.html
#   .\render.ps1 my-spec.json           # render a custom spec to dark-timeline.svg
#   .\render.ps1 my-spec.json out.svg   # render to a named output file

param(
    [string]$InputJson  = "",
    [string]$OutputSvg  = "dark-timeline.svg"
)

$script = Join-Path $PSScriptRoot "gen_svg.js"

$args = @()
if ($InputJson)  { $args += $InputJson }
if ($OutputSvg)  { $args += $OutputSvg }

node $script @args
