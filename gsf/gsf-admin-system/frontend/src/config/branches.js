import apiClient from '../services/api';

/**
 * Centralized GSF Branch Configuration
 * Includes lat/lng coordinates for interactive Leaflet Map representation
 */
export const GSF_BRANCHES = [
  {
    id: "Nellore-1 (Ramalinga Puram)",
    name: "Nellore-1 (Ramalinga Puram)",
    city: "Nellore",
    phone: "+91 98765 43210",
    rawPhone: "+919876543210",
    address: "Srivari Plaza, Circle, Ramalinga Puram, Nellore, Andhra Pradesh 524003, India",
    timings: "9:30 AM - 6:30 PM",
    email: "nellore@gsf.com",
    lat: 14.4426,
    lng: 79.9865
  },
  {
    id: "Nellore-2 (Magunta Layout)",
    name: "Nellore-2 (Magunta Layout)",
    city: "Nellore",
    phone: "+91 99887 76655",
    rawPhone: "+919988776655",
    address: "Near viswasai school, Central Avenue, Dargamitta, Magunta Layout, Nellore, Andhra Pradesh 524003, India",
    timings: "9:30 AM - 6:30 PM",
    email: "nellore2@gsf.com",
    lat: 14.4332,
    lng: 79.9723
  },
  {
    id: "Hyderabad",
    name: "Hyderabad",
    city: "Hyderabad",
    phone: "+91 91234 56789",
    rawPhone: "+919123456789",
    address: "Hitec City, Madhapur, Hyderabad, Telangana",
    timings: "9:30 AM - 6:30 PM",
    email: "hyderabad@gsf.com",
    lat: 17.4486,
    lng: 78.3908
  },
  {
    id: "Tirupati",
    name: "Tirupati",
    city: "Tirupati",
    phone: "+91 95544 33221",
    rawPhone: "+919554433221",
    address: "GSF, Mr.palli circle, road, near lenskart, fashion zone, Avilali, Andhra Pradesh 517502, India",
    timings: "9:30 AM - 6:30 PM",
    email: "tirupati@gsf.com",
    lat: 13.6288,
    lng: 79.4192
  },
  {
    id: "chennai",
    name: "Chennai",
    city: "Chennai",
    phone: "+91 94433 22110",
    rawPhone: "+919443322110",
    address: "Anna Salai, T. Nagar, Chennai, Tamil Nadu",
    timings: "9:30 AM - 6:30 PM",
    email: "chennai@gsf.com",
    lat: 13.0418,
    lng: 80.2341
  }
];

export const fetchBranchesData = async () => {
  try {
    const res = await apiClient.get('/branches');
    if (res.success && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }
  } catch (err) {
    console.warn('Backend branches offline, fallback to defaults:', err);
  }
  return GSF_BRANCHES;
};

export default GSF_BRANCHES;
