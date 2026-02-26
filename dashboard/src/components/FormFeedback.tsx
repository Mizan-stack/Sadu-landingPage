/**
 * Inline success/error message for forms. No silent failures.
 */
type FormFeedbackProps = {
  success: string | null;
  error: string | null;
};

export function FormFeedback({ success, error }: FormFeedbackProps) {
  if (success) {
    return (
      <div
        role="status"
        className="rounded border border-emerald/40 dark:border-emerald/50 bg-emerald/10 dark:bg-emerald/20 px-4 py-2 text-emerald-dark dark:text-emerald-200"
      >
        {success}
      </div>
    );
  }
  if (error) {
    return (
      <div
        role="alert"
        className="rounded border border-red-300 dark:border-red-800 bg-red-50 dark:bg-red-900/20 px-4 py-2 text-red-800 dark:text-red-300"
      >
        {error}
      </div>
    );
  }
  return null;
}
