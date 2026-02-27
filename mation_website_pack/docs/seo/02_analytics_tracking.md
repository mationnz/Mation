# Analytics & tracking plan

## Goals

- Measure demo conversion
- Measure engagement with technical proof pages (Architecture, Security)
- Measure interaction with hero demo widget

## Events

- `cta_book_demo_click`
- `cta_talk_architect_click`
- `hero_demo_prompt_selected`
- `architecture_node_clicked`
- `security_sim_action_selected`
- `contact_form_submit`

## Properties to attach

- page_path
- prompt_id (for hero demo)
- node_id (for architecture explorer)
- action_id (for security simulator)
- device_type (mobile/desktop)

## Tools
- Plausible (simple) or GA4 (advanced)
