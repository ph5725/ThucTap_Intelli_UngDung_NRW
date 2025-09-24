using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using WebAPI_NRW.Services;

public static class PermissionHelper
{
    /// <summary>
    /// Kiểm tra user trong token có quyền thao tác (Add, Edit, View, Delete) 
    /// trên một tính năng cụ thể hay không.
    /// </summary>
    public static async Task<bool> HasFeaturePermission(
        ClaimsPrincipal user,
        string feature,
        string action,
        IPermissionService permissionService)
    {
        // Lấy toàn bộ quyền tính năng từ service (service sẽ tự lấy GroupId trong claim)
        var permissions = await permissionService.GetFeaturePermissionsAsync(user);

        if (permissions.TryGetValue(feature, out var featurePerms) && !string.IsNullOrEmpty(featurePerms))
        {
            var actions = featurePerms
                .Split(',', StringSplitOptions.RemoveEmptyEntries)
                .Select(a => a.Trim().ToLower());

            var normalizedAction = action.Trim().ToLower();

            // Debug ra console
            Console.WriteLine($"Danh sách quyền: {string.Join(" | ", actions)}");
            Console.WriteLine($"Hành động cần kiểm tra: {normalizedAction}");

            return actions.Contains(normalizedAction);
        }

        return false;
    }

    /// <summary>
    /// Kiểm tra user có quyền truy cập dữ liệu công ty hoặc DMA cụ thể.
    /// </summary>
    public static async Task<bool> HasDataPermission(
     ClaimsPrincipal user,
     string feature,
     string? dmaCode,
     bool isCompanyLevel,
     IPermissionService permissionService)
    {
        // Lấy quyền dữ liệu từ DB qua service
        var (company, dmas) = await permissionService.GetDataPermissionsAsync(user);

        // In giá trị dmaCode
        Console.WriteLine($"Gia tri dmaCode: '{dmaCode}'");

        // Kiểm tra feature
        if (feature.Trim().ToLower() == "nrwcongty")
        {
            // Kiểm tra quyền công ty
            if (isCompanyLevel && !string.IsNullOrEmpty(company) && company.Trim().ToLower() == "congty")
            {

                return true;
            }
        }
        else if (feature.Trim().ToLower() == "nrwdma")
        {
            // Kiểm tra quyền DMA
            if (dmas != null && dmas.Any())
            {
                Console.WriteLine($"Gia tri dmaCode sau xu ly: '{dmaCode?.Trim().ToLower()}'");
                Console.WriteLine($"Giá trị dmas trong db: {string.Join(", ", dmas ?? new List<string>())}");
                return dmas.Any(d => d.Trim().ToLower() == dmaCode?.Trim().ToLower());
            }
        }

        return false;
    }
}