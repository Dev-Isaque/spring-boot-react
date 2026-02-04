import { Button } from "./Button";

export function Modal({
  id = "exampleModal",
  title = "Título",
  children,
  footer,
  size,
  centered = true,
}) {
  const dialogClass = [
    "modal-dialog",
    centered ? "modal-dialog-centered" : "",
    size ? `modal-${size}` : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      className="modal fade"
      id={id}
      tabIndex={-1}
      aria-labelledby={`${id}Label`}
      aria-hidden="true"
    >
      <div className={dialogClass}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id={`${id}Label`}>
              {title}
            </h5>

            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            />
          </div>

          <div className="modal-body">{children}</div>

          <div className="modal-footer">
            {footer ?? (
              <>
                <Button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </Button>
                <Button type="button" className="btn btn-primary">
                  Ok
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
