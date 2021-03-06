import {environment} from '../environment';
import {notification} from 'antd';
import {getFilenameFromHeader} from "./util.service";

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
  loginPageLogoUrl: PlatformCustomizationItem<string>[];
  loginPageLogoBackUrl: PlatformCustomizationItem<string>[];
  loginPageBackgroundColorDesktop: PlatformCustomizationItem<string>[];
  loginPageBackgroundColorMobile: PlatformCustomizationItem<string>[];
  loginPageBackgroundImageDesktop: PlatformCustomizationItem<string>[];
  loginPageBackgroundImageMobile: PlatformCustomizationItem<string>[];
  loginPageBackgroundPositionDesktop: PlatformCustomizationItem<string>[];
  loginPageBackgroundPositionMobile: PlatformCustomizationItem<string>[];
  loginPageBackgroundSizeDesktop: PlatformCustomizationItem<string>[];
  loginPageBackgroundSizeMobile: PlatformCustomizationItem<string>[];
  loginPageAddressText: PlatformCustomizationItem<string>[];
  loginPageDisclaimerText: PlatformCustomizationItem<string>[];
  loginPageLegalBackgroundColorTheme: PlatformCustomizationItem<string | 'dark' | 'light'>[];
  loginPageTextColorTheme: PlatformCustomizationItem<string | 'dark' | 'light'>[];
  loginPageButtonColor: PlatformCustomizationItem<string>[];
  loginPageGrpdText: PlatformCustomizationItem<string>[];
  thanksPageBackgroundColorDesktop: PlatformCustomizationItem<string>[];
  thanksPageBackgroundColorMobile: PlatformCustomizationItem<string>[];
  thanksPageBackgroundImageDesktop: PlatformCustomizationItem<string>[];
  thanksPageBackgroundImageMobile: PlatformCustomizationItem<string>[];
  thanksPageBackgroundPositionDesktop: PlatformCustomizationItem<string>[];
  thanksPageBackgroundPositionMobile: PlatformCustomizationItem<string>[];
  thanksPageBackgroundSizeDesktop: PlatformCustomizationItem<string>[];
  thanksPageBackgroundSizeMobile: PlatformCustomizationItem<string>[];
  thanksPageContainerColorTheme: PlatformCustomizationItem<string | 'dark' | 'light'>[];
  thanksPageText: PlatformCustomizationItem<string>[];
  thanksPageRedirectUrl: PlatformCustomizationItem<string>[];
  thanksPageFormUrl: PlatformCustomizationItem<string>[];
}

class PlatformService {
  private static createRequestObject(method: string, url: string, body: Object): Request {
    return new Request(url, {
      method: method,
      credentials: 'include',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    });
  }

  public getCustomization(url: string): Promise<PlatformConfig> {
    const {baseUrl} = environment;
    const request = PlatformService.createRequestObject('POST', `${baseUrl}platform/config`, {url});

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

  public setParams(params: PlatformParams, errorMsg: string): Promise<boolean> {
    const {baseUrl} = environment;
    const request = PlatformService.createRequestObject('POST',`${baseUrl}platform/update/params`, {config: params});

    return fetch(request)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(`Can't set params config`);
        }
        return true;
      })
      .catch(err => {
        console.error(err);
        notification.error({
          message: 'Synchronization error',
          description: errorMsg
        });
        return false;
      });
  }

  public setCustomization(custo: Object, errorMsg: string): Promise<boolean> {
    const {baseUrl} = environment;
    const request = PlatformService.createRequestObject('POST',`${baseUrl}platform/update/customization`, {config: custo});

    return fetch(request)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(`Can't set customization config`);
        }
        return true;
      })
      .catch(err => {
        console.error(err);
        notification.error({
          message: 'Synchronization error',
          description: errorMsg
        });
        return false;
      });
  }

  public setCustomizationPart(type: keyof PlatformCustomization, data: PlatformCustomizationItem<any> | undefined, errorMsg: string): Promise<boolean> {
    if (!data) {
      console.error(new Error('No data provided'));
      return Promise.resolve(false);
    }

    const {baseUrl} = environment;
    const request = PlatformService.createRequestObject('PUT', `${baseUrl}platform/update/customization`, {
      type, locale: data.locale, value: data.value
    });

    return fetch(request)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(`Can't set customization config part`);
        }
        return true;
      })
      .catch(err => {
        console.error(err);
        notification.error({
          message: 'Synchronization error',
          description: errorMsg
        });
        return false;
      });
  }

  public deleteCustomizationPart(type: keyof PlatformCustomization, locale: string, errorMsg: string): Promise<boolean> {
    const {baseUrl} = environment;
    const request = PlatformService.createRequestObject('DELETE', `${baseUrl}platform/update/customization`, {type, locale});

    return fetch(request)
      .then((response: Response) => {
        if (!response.ok) {
          throw new Error(`Can't remove customization config part`);
        }
        return true;
      })
      .catch(err => {
        console.error(err);
        notification.error({
          message: 'Synchronization error',
          description: errorMsg
        });
        return false;
      });
  }

  public getCustomizationZip(): Promise<any> {
    const {baseUrl} = environment;
    let fileName = '';
    const request = new Request(`${baseUrl}platform/zip`, {
      method: 'GET',
      credentials: 'include'
    });
    
    return fetch(request)
      .then((response) => {
        if (response.status !== 200) {
          throw new Error('ZIP download has failed');
        } else {
          fileName = getFilenameFromHeader(response.headers.get('content-disposition'), 'zip');
          return response.blob();
        }
      })
      .then((blob) => {
        const file = window.URL.createObjectURL(blob);
        const link = document.createElement('A') as HTMLAnchorElement;
        link.href = file;
        link.download = fileName;
        link.click();
        return true;
      })
      .catch(err => {
        console.error(err);
        notification.error({
          message: 'Download error',
          description: `Can't download customization archive`
        });
        return false;
      })
  }
}

const platformService = new PlatformService();
export default platformService;
