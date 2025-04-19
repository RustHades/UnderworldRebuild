/**
 * Role hierarchy and permissions utilities for the server
 */

// Define the role hierarchy
const roleHierarchy: Record<string, string[]> = {
  root: ["admin", "moderator", "user"],
  admin: ["moderator", "user"],
  moderator: ["user"],
  user: []
};

/**
 * Check if a user has permission based on their role
 * @param userRole The user's role
 * @param requiredRole The role required for access
 * @returns true if the user has permission, false otherwise
 */
export function hasPermission(userRole: string | null, requiredRole: string): boolean {
  // If no user role, no permission
  if (!userRole) return false;
  
  // If same role, has permission
  if (userRole === requiredRole) return true;
  
  // Check if user role is higher in hierarchy
  return roleHierarchy[userRole]?.includes(requiredRole) || false;
}

/**
 * Admin middleware to check if a user has admin permissions
 */
export function adminMiddleware(req: any, res: any, next: any) {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Authentication required" });
  }
  
  const userRole = req.user?.role;
  
  if (!userRole || !hasPermission(userRole, "admin")) {
    return res.status(403).json({ message: "Admin access required" });
  }
  
  next();
}