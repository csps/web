import { ref } from "vue";
import { defineStore } from "pinia";

/**
 * Dialog store
 */
export const useDialog = defineStore("dialog", () => {
  const show = ref(false);
  const dialogTitle = ref("");
  const dialogMessage = ref("");
  const dialogOk = ref<DialogButton>();
  const dialogCancel = ref<DialogButton>();

  /**
   * Shows a dialog with the specified title and message.
   * @param title Dialog title
   * @param message Dialog message
   * @param ok Ok button configuration
   * @param cancel Cancel button configuration
   */
  function open(title: string, message: string, ok?: DialogButton, cancel?: DialogButton) {
    // If cancel button is not specified
    if (!cancel) {
      // Set default cancel button
      cancel = {
        text: "Cancel",
        click: () => {
          // Hide dialog
          hide();
        }
      }
    }

    // Set dialog properties
    show.value = true;
    dialogTitle.value = title;
    dialogMessage.value = message;
    dialogCancel.value = cancel;
    dialogOk.value = ok;
  }

  /**
   * Hides the dialog.
   */
  function hide() {
    show.value = false;
  }

  return {
    show, open, hide,
    title: dialogTitle,
    message: dialogMessage,
    cancel: dialogCancel,
    ok: dialogOk
  }
});