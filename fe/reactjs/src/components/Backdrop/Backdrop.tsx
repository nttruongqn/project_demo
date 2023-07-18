import { Backdrop, CircularProgress } from '@mui/material';
import * as React from 'react';


export interface IBackdropProps {
    isOpenBackdrop: boolean
}

export function BackdropComponet ({ isOpenBackdrop }: IBackdropProps) {
  return (
    <div>
       <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isOpenBackdrop}
      >
        Đang tải nè
        <CircularProgress color="inherit" sx={{ marginLeft: 2 }} />
      </Backdrop>
    </div>
  );
}
