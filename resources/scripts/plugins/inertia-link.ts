/* eslint-disable sort-imports */
import { h } from 'vue'
import { Link } from '@inertiajs/inertia-vue3'

const InertiaLink = (props, { slots, attrs }) => {
  return h(Link, { ...attrs, style: { color: 'inherit', 'text-decoration': 'inherit' } }, slots)
}

export default InertiaLink
