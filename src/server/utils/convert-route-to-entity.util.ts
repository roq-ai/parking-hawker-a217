const mapping: Record<string, string> = {
  bookings: 'booking',
  businesses: 'business',
  companies: 'company',
  'parking-spaces': 'parking_space',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
