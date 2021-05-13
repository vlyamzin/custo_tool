import {createContext, ReactElement, useContext, useEffect, useState} from 'react';
import {PlatformCustomization, PlatformParams} from './platform.service';

export type AppStatus = 'init' | 'loaded'

export interface ConfigContext {
  customization: PlatformCustomization;
  params: PlatformParams;
  selectedLocale?: string;
  status: AppStatus;
  platformUrl: string
}

interface ConfigProviderProps {
  children: ReactElement[]
}

type Dispatch = (prev: ConfigContext | (() => ConfigContext)) => void;

const ConfigContext = createContext<{config: ConfigContext, setConfig: Dispatch} | undefined>(undefined);

function ConfigProvider(props: ConfigProviderProps) {
  const [config, setConfig] = useState<ConfigContext>(loadLocalConfig('config'));

  useEffect(() => {
    saveLocalConfig('config', config);
  }, [config])

  const value = {config, setConfig};
  console.log('ConfigProvider');
  return <ConfigContext.Provider value={value}>{props.children}</ConfigContext.Provider>
}

function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used withing a ConfigProvider');
  }
  return context;
}

function loadLocalConfig(type: string): any {
  try {
    return JSON.parse(localStorage.getItem(type) || '');
  } catch (err) {
    console.warn(`Local ${type} config is not valid`);
    return {}
  }
}

function saveLocalConfig(type: string, data: any): void {
  if (typeof data === 'string') {
    localStorage.setItem(type, data);
    return;
  }

  if (typeof data === 'object') {
    try {
      localStorage.setItem(type, JSON.stringify(data))
    } catch (e) {
      console.warn(`Provided ${type} config is not a valid object`);
      console.error(e);
    }
  }
}

export {ConfigProvider, useConfig}
