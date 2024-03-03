import { ref } from "vue";
import { defineStore } from "pinia";
import { v4 } from "uuid";

type DialogData = {
  title: string;
  message: string;
  ok?: DialogButton;
  cancel?: DialogButton | null;
  dialogHide?: () => void;
  dismissible?: boolean;
};

/**
 * Dialog store
 */
export const useDialog = defineStore("dialog", () => {
  const queue = ref<DialogQueueItem[]>([]);

  /**
   * Shows a dialog with the specified title and message.
   * @param data Dialog data
   */
  function open(data: DialogData) {
    // Generate dialog id
    const id = v4();

    // If cancel button is not specified
    if (data.cancel === undefined) {
      // Set default cancel button
      data.cancel = {
        text: "Cancel",
        click: () => close(id)
      }
    }

    // Add dialog to queue
    queue.value.push({
      show: true,
      id,
      title: data.title,
      message: data.message,
      ok: data.ok,
      cancel: data.cancel,
      dialogHide: data.dialogHide,
      dismissible: data.dismissible === undefined ? false : data.dismissible
    });

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