import { ImageManager } from 'easy-email-core';
import { EnvReader } from '@demo';

const defaultImagesMap = {
  // Social media icons are loaded from here (2/3/4), i don't know why, don't care, that's just messy how images get loaded, or IDE has code resolving issues
  IMAGE_02:          EnvReader.getDomainWithProtocol() + 'images/acbae5eb-efa4-4eb6-866c-f421e740b713-ad3c92b1-9cdb-4a7b-aad3-75ad809db8a3.png',
  IMAGE_03:          EnvReader.getDomainWithProtocol() + 'images/98520d6c-5cef-449e-bcbf-6316ccec2088-e8780361-0deb-4896-895e-e690c886cdf0.png',
  IMAGE_04:          EnvReader.getDomainWithProtocol() + 'images/b064f705-34ba-4400-975e-9dd0cec21c30-cc9aa158-56bd-4bf1-b532-72390d25c864.png',

  IMAGE_59:          EnvReader.getDomainWithProtocol() + 'images/06ca521d-9728-4de6-a709-1b75a828bfc3-2a9b1224-3d71-43b8-b52f-e7cdcdc9107b.png',
  AttributePanel_01: EnvReader.getDomainWithProtocol() + 'images/e22f78f2-aa76-408d-ba94-c95c7abe1908-image.png',
  AttributePanel_02: EnvReader.getDomainWithProtocol() + 'images/3e952a6e-2506-470e-b395-3e0d995157c5.png',
  AttributePanel_03: EnvReader.getDomainWithProtocol() + 'images/Fi_vI4vyLhTM-Tp6ivq4dR_ieGHk.png',
};

ImageManager.add(defaultImagesMap);

export function getImg(name: keyof typeof defaultImagesMap) {
  return ImageManager.get(name);
}
