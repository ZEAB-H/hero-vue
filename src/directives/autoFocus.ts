import type { DirectiveBinding } from 'vue'

export interface AutoFocusElement extends HTMLElement {
  _autoFocusCleanup?: () => void
}

export const vAutoFocus = {
  mounted(el: AutoFocusElement, binding: DirectiveBinding) {
    // Focus immediately if directive value is true or no value provided
    if (binding.value !== false) {
      // Use nextTick to ensure DOM is fully rendered
      setTimeout(() => {
        el.focus()
      }, 0)
    }

    // Advanced: Auto-focus on visibility change (when modal opens)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && binding.value !== false) {
            setTimeout(() => {
              el.focus()
            }, 100) // Small delay for smooth animation
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(el)

    // Store cleanup function
    el._autoFocusCleanup = () => {
      observer.disconnect()
    }
  },

  updated(el: AutoFocusElement, binding: DirectiveBinding) {
    // Re-focus if binding value changes to true
    if (binding.value === true && binding.oldValue === false) {
      setTimeout(() => {
        el.focus()
      }, 0)
    }
  },

  beforeUnmount(el: AutoFocusElement) {
    // Cleanup observer
    if (el._autoFocusCleanup) {
      el._autoFocusCleanup()
    }
  },
}
