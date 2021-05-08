import {environment} from '../environment';
import {notification} from 'antd';

export interface PlatformConfig {
  id: string;
  params: PlatformParams;
  customization: PlatformCustomization
}

export interface PlatformParams {
  availableLocales: Array<string>;
  defaultLocale?: string;
  oceBasicStyle?: boolean;
  oceModeOnly?: boolean;
}

export interface PlatformCustomizationItem<T> {
  locale: string;
  value: T
}

export interface PlatformCustomization {
  loginPageLogoUrl: [PlatformCustomizationItem<string>];
  loginPageLogoBackUrl: [PlatformCustomizationItem<string>];
  loginPageBackgroundColorDesktop: [PlatformCustomizationItem<string>];
  loginPageBackgroundColorMobile: [PlatformCustomizationItem<string>];
  loginPageBackgroundImageDesktop: [PlatformCustomizationItem<string>];
  loginPageBackgroundImageMobile: [PlatformCustomizationItem<string>];
  loginPageBackgroundPositionDesktop: [PlatformCustomizationItem<string>];
  loginPageBackgroundPositionMobile: [PlatformCustomizationItem<string>];
  loginPageBackgroundSizeDesktop: [PlatformCustomizationItem<string>];
  loginPageBackgroundSizeMobile: [PlatformCustomizationItem<string>];
  loginPageAddressText: [PlatformCustomizationItem<string>];
  loginPageDisclaimerText: [PlatformCustomizationItem<string>];
  loginPageLegalBackgroundColorTheme: [PlatformCustomizationItem<'dark' | 'light'>];
  loginPageTextColorTheme: [PlatformCustomizationItem<'dark' | 'light'>];
  loginPageButtonColor: [PlatformCustomizationItem<string>];
  loginPageGrpdText: [PlatformCustomizationItem<string>];
  thanksPageBackgroundColorDesktop: [PlatformCustomizationItem<string>];
  thanksPageBackgroundColorMobile: [PlatformCustomizationItem<string>];
  thanksPageBackgroundImageDesktop: [PlatformCustomizationItem<string>];
  thanksPageBackgroundImageMobile: [PlatformCustomizationItem<string>];
  thanksPageBackgroundPositionDesktop: [PlatformCustomizationItem<string>];
  thanksPageBackgroundPositionMobile: [PlatformCustomizationItem<string>];
  thanksPageBackgroundSizeDesktop: [PlatformCustomizationItem<string>];
  thanksPageBackgroundSizeMobile: [PlatformCustomizationItem<string>];
  thanksPageContainerColorTheme: [PlatformCustomizationItem<'dark' | 'light'>];
  thanksPageText: [PlatformCustomizationItem<string>];
  thanksPageRedirectUrl: [PlatformCustomizationItem<string>];
  thanksPageFormUrl: [PlatformCustomizationItem<string>];
}

class PlatformService {
  public getCustomization(url: string): Promise<PlatformConfig> {
    const {baseUrl} = environment;
    const request = new Request(`${baseUrl}platform/config`, {
      method: 'POST',
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({url})
    });

    return fetch(request)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(`Can't fetch a remote customization file`);
        }
        return response.json();
      })
      .then((config: PlatformConfig) => config)
      .catch(err => {
        // TODO add global error logger
        console.error(err);
        throw err;
      })
  }

  public setParams(params: Object, errorMsg: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log('Save params: ', params);

      // TODO check server response and show error if it failed
      if (false) {
        notification.error({
          message: 'Synchronization error',
          description: errorMsg
        });
      }
      resolve(true);
    })
  }

  public setCustomization(custo: Object, errorMsg: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log('Save customzation: ', custo);
      // TODO check server response and show error if it failed
      if (false) {
        notification.error({
          message: 'Synchronization error',
          description: errorMsg
        });
      }
      resolve(true);
    })
  }
}

const platformService = new PlatformService();
export default platformService;
