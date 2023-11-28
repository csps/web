import { ref } from "vue";
import { defineStore } from "pinia";
import { v4 } from "uuid";

/**
 * Dialog store
 */
export const useDialog = defineStore("dialog", () => {
  const queue = ref<DialogQueueItem[]>([]);

  /**
   * Shows a dialog with the specified title and message.
   * @param title Dialog title
   * @param message Dialog message
   * @param ok Ok button configuration
   * @param cancel Cancel button configuration
   */
  function open(title: string, message: string, ok?: DialogButton, cancel?: DialogButton | null, dialogHide?: () => void) {
    // Generate dialog id
    const id = v4();

    // If cancel button is not specified
    if (cancel === undefined) {
      // Set default cancel button
      cancel = {
        text: "Cancel",
        click: () => close(id)
      }
    }

    // Add dialog to queue
    queue.value.push({ show: true, id, title, message, ok, cancel, dialogHide });
    // Return dialog id
    return id;
  }

  /**
   * Close the dialog.
   * @param id Dialog ID
   */
  function close(id: string) {
   // Get dialog index
    const index = queue.value.findIndex(dialog => dialog.id === id);
    // If dialog is not found
    if (index === -1) return;
    // Hide dialog
    queue.value[index].show = false;

    // If dialog hide callback is specified
    if (typeof queue.value[index].dialogHide === "function") {
      // Call dialog hide callback
      queue.value[index].dialogHide!();
    }

    setTimeout(() => {
      // Remove dialog from queue
      queue.value.splice(index, 1);
    }, 210);
  }

  return {
    open,
    close,
    queue
  };
});