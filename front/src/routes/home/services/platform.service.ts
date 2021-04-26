import {environment} from '../../../environment';

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
  public getCustomization(url: string): Promise<PlatformCustomization> {
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
      .then((custoFile: PlatformCustomization) => custoFile)
      .catch(err => {
        // TODO add global error logger
        console.error(err);
        return err;
      })
  }
}

const platformService = new PlatformService();
export default platformService;
