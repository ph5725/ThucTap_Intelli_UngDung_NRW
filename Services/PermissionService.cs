using Microsoft.EntityFrameworkCore;
using System;
using System.Security.Claims;
using System.Text.RegularExpressions;
using WebAPI_NRW.Models.Database;

namespace WebAPI_NRW.Services
{
    public interface IPermissionService
    {
        Task<Dictionary<string, string>> GetFeaturePermissionsAsync(ClaimsPrincipal user);
        Task<(string company, List<string> dmas)> GetDataPermissionsAsync(ClaimsPrincipal user);
    }

    public class PermissionService : IPermissionService
    {
        private readonly DbNrwContext _context;

        public PermissionService(DbNrwContext context)
        {
            _context = context;
        }

        private int? GetGroupIdFromUser(ClaimsPrincipal user)
        {
            var groupIdClaim = user.FindFirst("GroupId");
            if (groupIdClaim == null) return null;

            return int.TryParse(groupIdClaim.Value, out var groupId) ? groupId : (int?)null;
        }

        public async Task<Dictionary<string, string>> GetFeaturePermissionsAsync(ClaimsPrincipal user)
        {
            var groupId = GetGroupIdFromUser(user);
            if (groupId == null) return new Dictionary<string, string>();

            var featurePermission = await _context.PhanQuyenTinhNangs
                .Where(p => p.NhomNguoiDung == groupId)
                .FirstOrDefaultAsync();

            if (featurePermission == null)
                return new Dictionary<string, string>();

            return new Dictionary<string, string>
            {
                { "donghotong", featurePermission.DongHoTong },
                { "cauhinhdht", featurePermission.CauHinhDht },
                { "dsdma", featurePermission.Dsdma },
                { "nrwcongty", featurePermission.NrwcongTy },
                { "nrwdma", featurePermission.Nrwdma },
                { "dsngaydocsobilling", featurePermission.DsngayDocSoBilling },
                { "nguoidung", featurePermission.NguoiDung },
                { "nhomnguoidung", featurePermission.NhomNguoiDungTinhNang },
                { "nhatky", featurePermission.NhatKySuDung },
                { "phanquyen", featurePermission.PhanQuyen },
            };
        }

        public async Task<(string company, List<string> dmas)> GetDataPermissionsAsync(ClaimsPrincipal user)
        {
            var groupId = GetGroupIdFromUser(user);
            if (groupId == null) return (null, new List<string>());

            var dataPermission = await _context.PhanQuyenDuLieus
                .Where(p => p.NhomNguoiDung == groupId)
                .FirstOrDefaultAsync();

            if (dataPermission == null)
                return (null, new List<string>());

            return (
                dataPermission.DuLieuNrwcongTy,
                dataPermission.DuLieuNrwdma?.Split(',').ToList() ?? new List<string>()
            );
        }
    }

}
