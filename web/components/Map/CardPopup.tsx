import { chakra } from "@chakra-ui/react";
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
      <chakra.div
        // leaflet css overrides popup text color so bring it back
        color="var(--text-color)"
      >
        <WhiteCard divide={divide} padding={2}>
          {children}
        </WhiteCard>
      </chakra.div>
    </Popup>
  );
};

export default memo(CardPopup);
