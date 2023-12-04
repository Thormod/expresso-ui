import { CONFIG } from "../app/constants";

const getSiteIdByUser = (user, currentSiteId) => {
  if (user) {
    const permissions =
      user[`${CONFIG.AUTH0_NAMESPACE}user_metadata`]?.permissions || [];

    let siteId;

    if (currentSiteId) {
      const permissionByCurrentSiteId = permissions.filter(
        (permission) => permission.site_id === currentSiteId
      );
      siteId = permissionByCurrentSiteId[0]?.site_id || null;
    } else {
      siteId = permissions[0]?.site_id || null;
    }
    return siteId;
  } else return null;
};

const getRoleBySiteIdAndUser = (user, currentSiteId) => {
  if (user && currentSiteId) {
    const permissions =
      user[`${CONFIG.AUTH0_NAMESPACE}user_metadata`]?.permissions || [];
    const permissionByCurrentSiteId = permissions.filter(
      (permission) => permission.site_id === currentSiteId
    );
    return permissionByCurrentSiteId[0]?.role || null;
  } else return null;
};

const ROLES = {
  ADMIN: "Admin",
  OWNER: "Owner",
  TECHNICIAN: "Technician",
};

export { getSiteIdByUser, getRoleBySiteIdAndUser, ROLES };
