import { h } from "preact";
import { Popup, PopupProps } from "react-leaflet";
import { css, cx } from "emotion";
import { memo } from "preact/compat";

const CardPopup = ({
  autoPan = false,
  className,
  children,
  divide,
  ...props
}: PopupProps & { divide?: boolean }) => {
  return (
    <Popup
      autoPan={autoPan}
      className={cx(
        className,
        css`
          font-family: Bonobo;

          .leaflet-popup-content-wrapper {
            /* rounded */
            border-radius: 0.25rem;

            /* shadow-lg */
            box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
              0 4px 6px -2px rgba(0, 0, 0, 0.05);
          }

          .leaflet-popup-content {
            margin: 0;
          }
        `
      )}
      {...props}
    >
      <div
        className={cx(
          "flex flex-col text-base",
          divide ? "px-2 divide-y divide-gray-300" : "p-2"
        )}
      >
        {children}
      </div>
    </Popup>
  );
};

export default memo(CardPopup);
