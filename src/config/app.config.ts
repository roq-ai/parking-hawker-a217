interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Parking Space Provider'],
  customerRoles: ['Customer'],
  tenantRoles: ['Business Owner', 'Parking Space Provider'],
  tenantName: 'Company',
  applicationName: 'Parking Hawker',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
