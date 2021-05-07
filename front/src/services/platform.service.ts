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

export interface PlatformCustomization {
  loginPageLogoUrl: string;
  loginPageLogoBackUrl: string;
  loginPageBackgroundColorDesktop: string;
  loginPageBackgroundColorMobile: string;
  loginPageBackgroundImageDesktop: string;
  loginPageBackgroundImageMobile: string;
  loginPageBackgroundPositionDesktop: string;
  loginPageBackgroundPositionMobile: string;
  loginPageBackgroundSizeDesktop: string;
  loginPageBackgroundSizeMobile: string;
  loginPageAddressText: string;
  loginPageDisclaimerText: string;
  loginPageLegalBackgroundColorTheme: 'dark' | 'light';
  loginPageTextColorTheme: 'dark' | 'light';
  loginPageButtonColor: string;
  loginPageGrpdText: string;
  thanksPageBackgroundColorDesktop: string;
  thanksPageBackgroundColorMobile: string;
  thanksPageBackgroundImageDesktop: string;
  thanksPageBackgroundImageMobile: string;
  thanksPageBackgroundPositionDesktop: string;
  thanksPageBackgroundPositionMobile: string;
  thanksPageBackgroundSizeDesktop: string;
  thanksPageBackgroundSizeMobile: string;
  thanksPageContainerColorTheme: 'dark' | 'light';
  thanksPageText: string;
  thanksPageRedirectUrl: string;
  thanksPageFormUrl: string;
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

  public setCustomization(custo: Object): Promise<boolean> {
    return new Promise((resolve, reject) => {
      console.log('Save customzation: ', custo);
      resolve(true);
    })
  }
}

const platformService = new PlatformService();
export default platformService;
