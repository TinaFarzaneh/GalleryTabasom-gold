import React from "react";
import { Suspense } from "react";

export const Loadable = (Component) => (props) =>
  (
    <Suspense>
      <Component {...props} />
    </Suspense>
  );
