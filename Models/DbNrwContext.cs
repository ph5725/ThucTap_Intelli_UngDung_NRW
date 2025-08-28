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
        => optionsBuilder.UseSqlServer("Data Source=HP;Initial Catalog=DB_NRW;User ID=user_nrw;Trust Server Certificate=True;Trusted_Connection=true;User ID=user_nrw;Password=123456");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Billing>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Billing__3214EC07BE675F1A");

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
                .HasConstraintName("FK__Billing__NguoiCa__73BA3083");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.BillingNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__Billing__NguoiTa__74AE54BC");
        });

        modelBuilder.Entity<CauHinhDht>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__CauHinhD__3214EC076B42E5F8");

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
                .HasConstraintName("FK__CauHinhDH__Nguoi__75A278F5");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.CauHinhDhtNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__CauHinhDH__Nguoi__76969D2E");
        });

        modelBuilder.Entity<DongHoTong>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DongHoTo__3214EC07888E01D7");

            entity.ToTable("DongHoTong");

            entity.HasIndex(e => e.Ma, "UQ__DongHoTo__3214CC9E3C3499BF").IsUnique();

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
                .HasConstraintName("FK__DongHoTon__Nguoi__787EE5A0");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.DongHoTongNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__DongHoTon__Nguoi__797309D9");
        });

        modelBuilder.Entity<Dsdma>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DSDMA__3214EC07F380518B");

            entity.ToTable("DSDMA");

            entity.HasIndex(e => e.MaDma, "UQ__DSDMA__3D8821D37C5A95A7").IsUnique();

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
                .HasConstraintName("FK__DSDMA__NguoiCapN__7A672E12");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.DsdmaNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__DSDMA__NguoiTao__7B5B524B");
        });

        modelBuilder.Entity<DsngayDocSoBilling>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DSNgayDo__3214EC0730C0BA64");

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
                .HasConstraintName("FK__DSNgayDoc__Nguoi__7C4F7684");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.DsngayDocSoBillingNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__DSNgayDoc__Nguoi__7D439ABD");
        });

        modelBuilder.Entity<DsngayDocSoBillingChiTiet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__DSNgayDo__3214EC075ECDB72F");

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
                .HasConstraintName("FK__DSNgayDoc__Nguoi__7E37BEF6");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.DsngayDocSoBillingChiTietNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__DSNgayDoc__Nguoi__7F2BE32F");
        });

        modelBuilder.Entity<NguoiDung>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NguoiDun__3214EC07FB6FE134");

            entity.ToTable("NguoiDung");

            entity.HasIndex(e => e.Ma, "UQ__NguoiDun__3214CC9ED71E1004").IsUnique();

            entity.HasIndex(e => e.TenNguoiDung, "UQ__NguoiDun__57E5A81DD7862FDF").IsUnique();

            entity.HasIndex(e => e.Email, "UQ__NguoiDun__A9D105342DFA1B6B").IsUnique();

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
            entity.HasKey(e => e.Id).HasName("PK__NhatKySu__3214EC07D46C7B80");

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
                .HasConstraintName("FK__NhatKySuD__Nguoi__01142BA1");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NhatKySuDungNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__NhatKySuD__Nguoi__02084FDA");

            entity.HasOne(d => d.TenNguoiDungNavigation).WithMany(p => p.NhatKySuDungTenNguoiDungNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.TenNguoiDung)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__NhatKySuD__TenNg__02FC7413");
        });

        modelBuilder.Entity<NhomNguoiDung>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NhomNguo__3214EC0759AFD0A5");

            entity.ToTable("NhomNguoiDung");

            entity.HasIndex(e => e.NhomNguoiDung1, "UQ__NhomNguo__44C3D22077677B49").IsUnique();

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
                .HasConstraintName("FK__NhomNguoi__Nguoi__03F0984C");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NhomNguoiDungNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__NhomNguoi__Nguoi__04E4BC85");
        });

        modelBuilder.Entity<NrwcongTy>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NRWCongT__3214EC07D72A0355");

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
                .HasConstraintName("FK__NRWCongTy__Nguoi__05D8E0BE");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NrwcongTyNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__NRWCongTy__Nguoi__06CD04F7");
        });

        modelBuilder.Entity<NrwcongTyDauVaoChiTiet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NRWCongT__3214EC0712B57D6E");

            entity.ToTable("NRWCongTyDauVaoChiTiet");

            entity.Property(e => e.GhiChu).HasMaxLength(255);
            entity.Property(e => e.NgayTao).HasDefaultValueSql("(getdate())");
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
                .HasConstraintName("FK__NRWCongTy__Nguoi__07C12930");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NrwcongTyDauVaoChiTietNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__NRWCongTy__Nguoi__08B54D69");
        });

        modelBuilder.Entity<NrwcongTyTieuThuChiTiet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NRWCongT__3214EC072BB8F242");

            entity.ToTable("NRWCongTyTieuThuChiTiet");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.NgayTao).HasDefaultValueSql("(getdate())");
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
                .HasConstraintName("FK__NRWCongTy__Nguoi__0A9D95DB");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NrwcongTyTieuThuChiTietNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__NRWCongTy__Nguoi__0B91BA14");
        });

        modelBuilder.Entity<Nrwdma>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NRWDMA__3214EC07AE203EA9");

            entity.ToTable("NRWDMA");

            entity.Property(e => e.GhiChu).HasMaxLength(255);
            entity.Property(e => e.MaDma)
                .HasMaxLength(50)
                .HasColumnName("MaDMA");
            entity.Property(e => e.NgayTao).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.NguoiCapNhat).HasMaxLength(255);
            entity.Property(e => e.NguoiTao).HasMaxLength(255);
            entity.Property(e => e.NguyenNhan).HasMaxLength(255);

            entity.HasOne(d => d.MaDmaNavigation).WithMany(p => p.Nrwdmas)
                .HasPrincipalKey(p => p.MaDma)
                .HasForeignKey(d => d.MaDma)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__NRWDMA__MaDMA__0D7A0286");

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.NrwdmaNguoiCapNhatNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiCapNhat)
                .HasConstraintName("FK__NRWDMA__NguoiCap__0E6E26BF");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NrwdmaNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__NRWDMA__NguoiTao__0F624AF8");
        });

        modelBuilder.Entity<NrwdmadauVaoChiTiet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NRWDMADa__3214EC077AA5B3F4");

            entity.ToTable("NRWDMADauVaoChiTiet");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.MaDma)
                .HasMaxLength(50)
                .HasColumnName("MaDMA");
            entity.Property(e => e.NgayTao).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.NguoiCapNhat).HasMaxLength(255);
            entity.Property(e => e.NguoiTao).HasMaxLength(255);
            entity.Property(e => e.Nguon).HasMaxLength(255);
            entity.Property(e => e.ToanTu).HasMaxLength(10);

            entity.HasOne(d => d.MaDauVaoNavigation).WithMany(p => p.NrwdmadauVaoChiTiets)
                .HasForeignKey(d => d.MaDauVao)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_DauVaoChiTiet_NRWCongTy");

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.NrwdmadauVaoChiTietNguoiCapNhatNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiCapNhat)
                .HasConstraintName("FK__NRWDMADau__Nguoi__10566F31");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NrwdmadauVaoChiTietNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__NRWDMADau__Nguoi__114A936A");
        });

        modelBuilder.Entity<NrwdmatieuThuChiTiet>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__NRWDMATi__3214EC07C44BF069");

            entity.ToTable("NRWDMATieuThuChiTiet");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.MaDma)
                .HasMaxLength(50)
                .HasColumnName("MaDMA");
            entity.Property(e => e.NgayTao).HasDefaultValueSql("(getdate())");
            entity.Property(e => e.NguoiCapNhat).HasMaxLength(255);
            entity.Property(e => e.NguoiTao).HasMaxLength(255);
            entity.Property(e => e.Nguon).HasMaxLength(255);
            entity.Property(e => e.ToanTu).HasMaxLength(10);

            entity.HasOne(d => d.MaTieuThuNavigation).WithMany(p => p.NrwdmatieuThuChiTiets)
                .HasForeignKey(d => d.MaTieuThu)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_TieuThuChiTiet_NRWDMA");

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.NrwdmatieuThuChiTietNguoiCapNhatNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiCapNhat)
                .HasConstraintName("FK__NRWDMATie__Nguoi__1332DBDC");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NrwdmatieuThuChiTietNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__NRWDMATie__Nguoi__14270015");
        });

        modelBuilder.Entity<PhanQuyenDuLieu>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__PhanQuye__3214EC070063EC2C");

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
                .HasConstraintName("FK__PhanQuyen__NhomN__160F4887");
        });

        modelBuilder.Entity<PhanQuyenTinhNang>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__PhanQuye__3214EC0767259CC5");

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
                .HasConstraintName("FK__PhanQuyen__Nguoi__17036CC0");

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.PhanQuyenTinhNangNguoiTaoNavigations)
                .HasPrincipalKey(p => p.TenNguoiDung)
                .HasForeignKey(d => d.NguoiTao)
                .HasConstraintName("FK__PhanQuyen__Nguoi__17F790F9");

            entity.HasOne(d => d.NhomNguoiDungNavigation).WithMany(p => p.PhanQuyenTinhNangs)
                .HasPrincipalKey(p => p.NhomNguoiDung1)
                .HasForeignKey(d => d.NhomNguoiDung)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__PhanQuyen__NhomN__18EBB532");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
