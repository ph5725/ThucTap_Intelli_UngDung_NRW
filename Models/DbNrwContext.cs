using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WebAPI_NRW.Models;

public partial class DbNrwContext : DbContext
{
    public DbNrwContext()
    {
    }

    public DbNrwContext(DbContextOptions<DbNrwContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Billing> Billings { get; set; }

    public virtual DbSet<CauHinhDht> CauHinhDhts { get; set; }

    public virtual DbSet<DongHoTong> DongHoTongs { get; set; }

    public virtual DbSet<Dsdma> Dsdmas { get; set; }

    public virtual DbSet<DsngayDocSoBilling> DsngayDocSoBillings { get; set; }

    public virtual DbSet<DsngayDocSoBillingChiTiet> DsngayDocSoBillingChiTiets { get; set; }

    public virtual DbSet<NguoiDung> NguoiDungs { get; set; }

    public virtual DbSet<NhatKySuDung> NhatKySuDungs { get; set; }

    public virtual DbSet<NhomNguoiDung> NhomNguoiDungs { get; set; }

    public virtual DbSet<NrwcongTy> NrwcongTies { get; set; }

    public virtual DbSet<NrwcongTyDauVaoChiTiet> NrwcongTyDauVaoChiTiets { get; set; }

    public virtual DbSet<NrwcongTyTieuThuChiTiet> NrwcongTyTieuThuChiTiets { get; set; }

    public virtual DbSet<Nrwdma> Nrwdmas { get; set; }

    public virtual DbSet<NrwdmadauVaoChiTiet> NrwdmadauVaoChiTiets { get; set; }

    public virtual DbSet<NrwdmatieuThuChiTiet> NrwdmatieuThuChiTiets { get; set; }

    public virtual DbSet<PhanQuyenDuLieu> PhanQuyenDuLieus { get; set; }

    public virtual DbSet<PhanQuyenTinhNang> PhanQuyenTinhNangs { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        // Chỉnh lại chuỗi ở đây
        => optionsBuilder.UseSqlServer("Data Source=HP;Initial Catalog=DB_NRW;User ID=user_nrw;Password=123456;Trust Server Certificate=True;Trusted_Connection=true;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Billing>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Billing__3214EC07E15AB955");

            entity.ToTable("Billing");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.MaDoiTuong).HasMaxLength(50);
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NguoiCapNhat).HasMaxLength(255);
            entity.Property(e => e.NguoiTao).HasMaxLength(255);

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.BillingNguoiCapNhatNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiCapNhat)
                .HasConstraintName("FK__Billing__NguoiCa__797309D9");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.BillingNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__Billing__NguoiTa__00200768");
        });

        modelBuilder.Entity<CauHinhDht>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__CauHinhD__3214EC07A4BFA81A");

            entity.ToTable("CauHinhDHT");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.MaDoiTuong).HasMaxLength(50);
            entity.Property(e => e.MaDongHo).HasMaxLength(50);
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NguoiCapNhat).HasMaxLength(255);
            entity.Property(e => e.NguoiTao).HasMaxLength(255);

            entity.HasOne(d => d.MaDongHoNavigation).WithMany(p => p.CauHinhDhts)
                .HasPrincipalKey(p => p.Ma)
                .HasForeignKey(d => d.MaDongHo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_CauHinhDHT_DongHoTong");

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.CauHinhDhtNguoiCapNhatNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiCapNhat)
                .HasConstraintName("FK__CauHinhDH__Nguoi__01142BA1");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.CauHinhDhtNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__CauHinhDH__Nguoi__02084FDA");
        });

        modelBuilder.Entity<DongHoTong>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DongHoTo__3214EC07786FC227");

            entity.ToTable("DongHoTong");

            entity.HasIndex(e => e.Ma, "UQ__DongHoTo__3214CC9ECFA042CE").IsUnique();

            entity.HasIndex(e => e.Ma, "UQ__DongHoTo__3214CC9EEA5C98DA").IsUnique();

            entity.HasIndex(e => e.Ten, "UQ__DongHoTo__C451FA83A3754D9C").IsUnique();

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.Ma).HasMaxLength(50);
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NguoiCapNhat).HasMaxLength(255);
            entity.Property(e => e.NguoiChinhSua).HasMaxLength(100);
            entity.Property(e => e.NguoiTao).HasMaxLength(255);
            entity.Property(e => e.Ten).HasMaxLength(255);

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.DongHoTongNguoiCapNhatNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiCapNhat)
                .HasConstraintName("FK__DongHoTon__Nguoi__09A971A2");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.DongHoTongNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__DongHoTon__Nguoi__0A9D95DB");
        });

        modelBuilder.Entity<Dsdma>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DSDMA__3214EC07C49334AC");

            entity.ToTable("DSDMA");

            entity.HasIndex(e => e.TenDma, "UQ__DSDMA__316CA9EE21F88CB1").IsUnique();

            entity.HasIndex(e => e.TenDma, "UQ__DSDMA__316CA9EED2C2243E").IsUnique();

            entity.HasIndex(e => e.MaDma, "UQ__DSDMA__3D8821D3D2E9F060").IsUnique();

            entity.HasIndex(e => e.MaDma, "UQ__DSDMA__3D8821D3FB2FB2B4").IsUnique();

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.MaDma)
                .HasMaxLength(50)
                .HasColumnName("MaDMA");
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NguoiCapNhat).HasMaxLength(255);
            entity.Property(e => e.NguoiTao).HasMaxLength(255);
            entity.Property(e => e.TenDma)
                .HasMaxLength(255)
                .HasColumnName("TenDMA");
            entity.Property(e => e.TinhTrang)
                .HasMaxLength(50)
                .HasDefaultValue("Tot");
            entity.Property(e => e.TyLeNrwbanDau).HasColumnName("TyLeNRWBanDau");

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.DsdmaNguoiCapNhatNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiCapNhat)
                .HasConstraintName("FK__DSDMA__NguoiCapN__114A936A");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.DsdmaNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__DSDMA__NguoiTao__151B244E");
        });

        modelBuilder.Entity<DsngayDocSoBilling>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DSNgayDo__3214EC075985C37F");

            entity.ToTable("DSNgayDocSoBilling");

            entity.HasIndex(e => new { e.Nam, e.Ky }, "UQ_DSNgayDocSoBilling_NamKy").IsUnique();

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NguoiCapNhat).HasMaxLength(255);
            entity.Property(e => e.NguoiTao).HasMaxLength(255);

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.DsngayDocSoBillingNguoiCapNhatNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiCapNhat)
                .HasConstraintName("FK__DSNgayDoc__Nguoi__18EBB532");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.DsngayDocSoBillingNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__DSNgayDoc__Nguoi__19DFD96B");
        });

        modelBuilder.Entity<DsngayDocSoBillingChiTiet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DSNgayDo__3214EC07CF66E779");

            entity.ToTable("DSNgayDocSoBillingChiTiet");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NguoiCapNhat).HasMaxLength(255);
            entity.Property(e => e.NguoiTao).HasMaxLength(255);

            entity.HasOne(d => d.MaNgayDocSoNavigation).WithMany(p => p.DsngayDocSoBillingChiTiets)
                .HasForeignKey(d => d.MaNgayDocSo)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DSNgayDocSoBillingChiTiet_DSNgayDocSoBilling");

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.DsngayDocSoBillingChiTietNguoiCapNhatNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiCapNhat)
                .HasConstraintName("FK__DSNgayDoc__Nguoi__208CD6FA");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.DsngayDocSoBillingChiTietNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__DSNgayDoc__Nguoi__2180FB33");
        });

        modelBuilder.Entity<NguoiDung>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NguoiDun__3214EC078A3CC6E1");

            entity.ToTable("NguoiDung");

            entity.HasIndex(e => e.Ma, "UQ__NguoiDun__3214CC9E2216180A").IsUnique();

            entity.HasIndex(e => e.TenNguoiDung, "UQ__NguoiDun__57E5A81DA3A99382").IsUnique();

            entity.HasIndex(e => e.Email, "UQ__NguoiDun__A9D10534A6E24F35").IsUnique();

            entity.Property(e => e.AnhDaiDien).HasMaxLength(500);
            entity.Property(e => e.CapPhep).HasDefaultValue(true);
            entity.Property(e => e.Email).HasMaxLength(255);
            entity.Property(e => e.Ma).HasMaxLength(50);
            entity.Property(e => e.MatKhau).HasMaxLength(255);
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NguoiCapNhat).HasMaxLength(255);
            entity.Property(e => e.NguoiTao).HasMaxLength(255);
            entity.Property(e => e.Ten).HasMaxLength(255);
            entity.Property(e => e.TenNguoiDung).HasMaxLength(255);
            entity.Property(e => e.VaiTro).HasMaxLength(50);
        });

        modelBuilder.Entity<NhatKySuDung>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NhatKySu__3214EC07C0E54723");

            entity.ToTable("NhatKySuDung");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.HanhDong).HasMaxLength(100);
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NguoiCapNhat).HasMaxLength(255);
            entity.Property(e => e.NguoiTao).HasMaxLength(255);
            entity.Property(e => e.TenNguoiDung).HasMaxLength(255);
            entity.Property(e => e.TinhNang).HasMaxLength(255);

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.NhatKySuDungNguoiCapNhatNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiCapNhat)
                .HasConstraintName("FK__NhatKySuD__Nguoi__29221CFB");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NhatKySuDungNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__NhatKySuD__Nguoi__2A164134");

            entity.HasOne(d => d.TenNguoiDungNavigation).WithMany(p => p.NhatKySuDungTenNguoiDungNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.TenNguoiDung)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__NhatKySuD__TenNg__30C33EC3");
        });

        modelBuilder.Entity<NhomNguoiDung>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NhomNguo__3214EC07B1E37E71");

            entity.ToTable("NhomNguoiDung");

            entity.HasIndex(e => e.NhomNguoiDung1, "UQ_NhomNguoiDung").IsUnique();

            entity.HasIndex(e => e.NhomNguoiDung1, "UQ__NhomNguo__44C3D220B084025D").IsUnique();

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NguoiCapNhat).HasMaxLength(255);
            entity.Property(e => e.NguoiTao).HasMaxLength(255);
            entity.Property(e => e.NhomNguoiDung1)
                .HasMaxLength(255)
                .HasColumnName("NhomNguoiDung");

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.NhomNguoiDungNguoiCapNhatNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiCapNhat)
                .HasConstraintName("FK__NhomNguoi__Nguoi__3493CFA7");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NhomNguoiDungNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__NhomNguoi__Nguoi__3587F3E0");
        });

        modelBuilder.Entity<NrwcongTy>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NRWCongT__3214EC07E681264E");

            entity.ToTable("NRWCongTy");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.Ma)
                .HasMaxLength(50)
                .HasDefaultValue("CongTy");
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NguoiCapNhat).HasMaxLength(255);
            entity.Property(e => e.NguoiTao).HasMaxLength(255);
            entity.Property(e => e.NguyenNhan).HasMaxLength(500);
            entity.Property(e => e.SoNgayDocSoDht).HasColumnName("SoNgayDocSoDHT");

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.NrwcongTyNguoiCapNhatNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiCapNhat)
                .HasConstraintName("FK__NRWCongTy__Nguoi__3C34F16F");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NrwcongTyNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__NRWCongTy__Nguoi__3D2915A8");
        });

        modelBuilder.Entity<NrwcongTyDauVaoChiTiet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NRWCongT__3214EC071CE591A1");

            entity.ToTable("NRWCongTyDauVaoChiTiet");

            entity.Property(e => e.GhiChu).HasMaxLength(255);
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NguoiCapNhat).HasMaxLength(255);
            entity.Property(e => e.NguoiTao).HasMaxLength(255);
            entity.Property(e => e.Nguon).HasMaxLength(100);
            entity.Property(e => e.ToanTu).HasMaxLength(10);

            entity.HasOne(d => d.MaDauVaoNavigation).WithMany(p => p.NrwcongTyDauVaoChiTiets)
                .HasForeignKey(d => d.MaDauVao)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_NRWCongTyDauVaoChiTiet_NRWCongTy");

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.NrwcongTyDauVaoChiTietNguoiCapNhatNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiCapNhat)
                .HasConstraintName("FK__NRWCongTy__Nguoi__14270015");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NrwcongTyDauVaoChiTietNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__NRWCongTy__Nguoi__151B244E");
        });

        modelBuilder.Entity<NrwcongTyTieuThuChiTiet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NRWCongT__3214EC07E50A0360");

            entity.ToTable("NRWCongTyTieuThuChiTiet");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NguoiCapNhat).HasMaxLength(255);
            entity.Property(e => e.NguoiTao).HasMaxLength(255);
            entity.Property(e => e.Nguon).HasMaxLength(255);
            entity.Property(e => e.ToanTu).HasMaxLength(10);

            entity.HasOne(d => d.MaTieuThuNavigation).WithMany(p => p.NrwcongTyTieuThuChiTiets)
                .HasForeignKey(d => d.MaTieuThu)
                .HasConstraintName("FK_NRWCongTyTieuThuChiTiet_MaTieuThu");

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.NrwcongTyTieuThuChiTietNguoiCapNhatNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiCapNhat)
                .HasConstraintName("FK__NRWCongTy__Nguoi__160F4887");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NrwcongTyTieuThuChiTietNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__NRWCongTy__Nguoi__17036CC0");
        });

        modelBuilder.Entity<Nrwdma>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NRWDMA__3214EC07B2A409BB");

            entity.ToTable("NRWDMA");

            entity.Property(e => e.GhiChu).HasMaxLength(255);
            entity.Property(e => e.MaDma)
                .HasMaxLength(50)
                .HasColumnName("MaDMA");
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NguoiCapNhat).HasMaxLength(255);
            entity.Property(e => e.NguoiTao).HasMaxLength(255);
            entity.Property(e => e.NguyenNhan).HasMaxLength(255);

            entity.HasOne(d => d.MaDmaNavigation).WithMany(p => p.Nrwdmas)
                .HasPrincipalKey(p => p.MaDma)
                .HasForeignKey(d => d.MaDma)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__NRWDMA__MaDMA__02084FDA");

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.NrwdmaNguoiCapNhatNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiCapNhat)
                .HasConstraintName("FK__NRWDMA__NguoiCap__17F790F9");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NrwdmaNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__NRWDMA__NguoiTao__18EBB532");
        });

        modelBuilder.Entity<NrwdmadauVaoChiTiet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NRWDMADa__3214EC07E637467C");

            entity.ToTable("NRWDMADauVaoChiTiet");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.MaDma)
                .HasMaxLength(50)
                .HasColumnName("MaDMA");
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NguoiCapNhat).HasMaxLength(255);
            entity.Property(e => e.NguoiTao).HasMaxLength(255);
            entity.Property(e => e.Nguon).HasMaxLength(255);
            entity.Property(e => e.ToanTu).HasMaxLength(10);

            entity.HasOne(d => d.MaDauVaoNavigation).WithMany(p => p.NrwdmadauVaoChiTiets)
                .HasForeignKey(d => d.MaDauVao)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DauVaoChiTiet_NRWCongTy");

            entity.HasOne(d => d.MaDmaNavigation).WithMany(p => p.NrwdmadauVaoChiTiets)
                .HasPrincipalKey(p => p.MaDma)
                .HasForeignKey(d => d.MaDma)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__NRWDMADau__MaDMA__4C6B5938");

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.NrwdmadauVaoChiTietNguoiCapNhatNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiCapNhat)
                .HasConstraintName("FK__NRWDMADau__Nguoi__19DFD96B");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NrwdmadauVaoChiTietNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__NRWDMADau__Nguoi__1AD3FDA4");
        });

        modelBuilder.Entity<NrwdmatieuThuChiTiet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NRWDMATi__3214EC07116C1585");

            entity.ToTable("NRWDMATieuThuChiTiet");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.MaDma)
                .HasMaxLength(50)
                .HasColumnName("MaDMA");
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NguoiCapNhat).HasMaxLength(255);
            entity.Property(e => e.NguoiTao).HasMaxLength(255);
            entity.Property(e => e.Nguon).HasMaxLength(255);
            entity.Property(e => e.ToanTu).HasMaxLength(10);

            entity.HasOne(d => d.MaDmaNavigation).WithMany(p => p.NrwdmatieuThuChiTiets)
                .HasPrincipalKey(p => p.MaDma)
                .HasForeignKey(d => d.MaDma)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__NRWDMATie__MaDMA__51300E55");

            entity.HasOne(d => d.MaTieuThuNavigation).WithMany(p => p.NrwdmatieuThuChiTiets)
                .HasForeignKey(d => d.MaTieuThu)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TieuThuChiTiet_NRWDMA");

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.NrwdmatieuThuChiTietNguoiCapNhatNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiCapNhat)
                .HasConstraintName("FK__NRWDMATie__Nguoi__1BC821DD");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NrwdmatieuThuChiTietNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__NRWDMATie__Nguoi__1CBC4616");
        });

        modelBuilder.Entity<PhanQuyenDuLieu>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__PhanQuye__3214EC0786341821");

            entity.ToTable("PhanQuyenDuLieu");

            entity.Property(e => e.DuLieuNrwcongTy)
                .HasMaxLength(50)
                .HasColumnName("DuLieuNRWCongTy");
            entity.Property(e => e.DuLieuNrwdma).HasColumnName("DuLieuNRWDMA");
            entity.Property(e => e.NhomNguoiDung).HasMaxLength(255);

            entity.HasOne(d => d.NhomNguoiDungNavigation).WithMany(p => p.PhanQuyenDuLieus)
                .HasPrincipalKey(p => p.NhomNguoiDung1)
                .HasForeignKey(d => d.NhomNguoiDung)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PhanQuyen__NhomN__55009F39");
        });

        modelBuilder.Entity<PhanQuyenTinhNang>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__PhanQuye__3214EC078DDE06F2");

            entity.ToTable("PhanQuyenTinhNang");

            entity.Property(e => e.CauHinhDht)
                .HasMaxLength(20)
                .HasColumnName("CauHinhDHT");
            entity.Property(e => e.DongHoTong).HasMaxLength(20);
            entity.Property(e => e.Dsdma)
                .HasMaxLength(20)
                .HasColumnName("DSDMA");
            entity.Property(e => e.DsngayDocSoBilling)
                .HasMaxLength(20)
                .HasColumnName("DSNgayDocSoBilling");
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NguoiCapNhat).HasMaxLength(255);
            entity.Property(e => e.NguoiDung).HasMaxLength(20);
            entity.Property(e => e.NguoiTao).HasMaxLength(255);
            entity.Property(e => e.NhatKySuDung).HasMaxLength(20);
            entity.Property(e => e.NhomNguoiDung).HasMaxLength(255);
            entity.Property(e => e.NhomNguoiDungTinhNang).HasMaxLength(20);
            entity.Property(e => e.NrwcongTy)
                .HasMaxLength(20)
                .HasColumnName("NRWCongTy");
            entity.Property(e => e.Nrwdma)
                .HasMaxLength(20)
                .HasColumnName("NRWDMA");
            entity.Property(e => e.PhanQuyen).HasMaxLength(20);

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.PhanQuyenTinhNangNguoiCapNhatNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiCapNhat)
                .HasConstraintName("FK__PhanQuyen__Nguoi__58D1301D");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.PhanQuyenTinhNangNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__PhanQuyen__Nguoi__59C55456");

            entity.HasOne(d => d.NhomNguoiDungNavigation).WithMany(p => p.PhanQuyenTinhNangs)
                .HasPrincipalKey(p => p.NhomNguoiDung1)
                .HasForeignKey(d => d.NhomNguoiDung)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PhanQuyen__NhomN__607251E5");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
