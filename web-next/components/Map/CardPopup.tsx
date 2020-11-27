import React, { memo, Ref } from "react";
import { Popup, PopupProps } from "react-leaflet";
import WhiteCard from "../WhiteCard";

const CardPopup = ({
  popupRef,
  autoPan = false,
  children,
  divide,
  ...props
}: PopupProps & { popupRef?: Ref<any>; divide?: boolean }) => {
  return (
    <Popup ref={popupRef} autoPan={autoPan} {...props}>
      <WhiteCard divide={divide} padding={2}>
        {children}
      </WhiteCard>
    </Popup>
  );
};

export default memo(CardPopup);
