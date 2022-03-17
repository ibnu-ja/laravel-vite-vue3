/* eslint-disable camelcase */

export interface Agent {
  is_desktop?: boolean
  platform?: string
  browser?: string
}

export interface Session {
  agent?: Agent
  ip_address?: string
  is_current_device?: boolean
  last_active?: string
}
