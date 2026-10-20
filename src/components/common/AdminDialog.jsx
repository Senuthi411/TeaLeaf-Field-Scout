export default function AdminDialog({
  dialogRef,
  dialog,
  setDialog,
  submit,
  route,
}) {
  return (
    <dialog
      ref={dialogRef}
      onCancel={() => setDialog(null)}
      onClick={(event) => event.stopPropagation()}
      aria-labelledby="dialog-title"
    >
      {dialog && (
        <>
          <h2 id="dialog-title">{dialog.title}</h2>
          {dialog.description && <p>{dialog.description}</p>}
          {dialog.kind === "user" || dialog.kind === "edit" ? (
            <form onSubmit={submit}>
              <label>
                {dialog.kind === "user" ? "Full name" : "Name"}
                <input
                  name="name"
                  required
                  minLength={2}
                  maxLength={100}
                  pattern=".*\S.*"
                  defaultValue={dialog.value || ""}
                  autoFocus
                />
              </label>
              {dialog.kind === "user" && (
                <>
                  <label>
                    Work email
                    <input name="email" type="email" required />
                  </label>
                  <label>
                    Role
                    <select name="role">
                      <option>Field Worker</option>
                      <option>Field Officer</option>
                      <option>Estate Manager</option>
                      <option>Agronomist</option>
                      <option>Admin</option>
                    </select>
                  </label>
                </>
              )}
              <div className="dialog-actions">
                <button type="button" onClick={() => setDialog(null)}>
                  Cancel
                </button>
                <button className="primary" type="submit">
                  Save locally
                </button>
              </div>
            </form>
          ) : (
            <div className="dialog-actions">
              <button onClick={() => setDialog(null)}>
                {dialog.kind === "confirm" ? "Cancel" : "Close"}
              </button>
              {dialog.kind === "confirm" && (
                <button
                  className="primary"
                  onClick={() => {
                    dialog.action?.();
                    setDialog(null);
                  }}
                >
                  Confirm
                </button>
              )}
              {dialog.title === "Administrator account" && (
                <button
                  onClick={() => {
                    setDialog(null);
                    route("/login");
                  }}
                >
                  Logout
                </button>
              )}
            </div>
          )}
        </>
      )}
    </dialog>
  );
}
