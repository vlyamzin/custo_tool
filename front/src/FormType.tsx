import {useConfig} from "./services/config.provider";
import React, {ReactElement} from "react";
import PlatformBuilder from "./components/platform-builder/PlatformBuilder";
import PlatformLoader from "./components/platform-loader/PlatformLoader";

interface FormTypeProps {

}

function FormType(props: FormTypeProps) {
  const {config} = useConfig();

  function showPlatformLoader(): ReactElement | null{
    return config?.status === "loaded"
      ? <PlatformBuilder/>
      : null;
  }

  return showPlatformLoader();
}

export default FormType;
