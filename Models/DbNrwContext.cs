using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace WebAPI_NRW.Models.Database;

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

    //    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
    //        => optionsBuilder.UseSqlServer("Data Source=HP;Initial Catalog=DB_NRW;User ID=user_nrw;Password=123456;Trust Server Certificate=True;Trusted_Connection=true;");
    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            var configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json")
                .Build();

            var connStr = configuration.GetConnectionString("ConnectServer");
            optionsBuilder.UseSqlServer(connStr);
        }
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Billing>(entity =>
        {
            entity.ToTable("Billing");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.MaDoiTuong).HasMaxLength(50);
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.BillingNguoiCapNhatNavigations).HasForeignKey(d => d.NguoiCapNhat);

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.BillingNguoiTaoNavigations)
                .HasForeignKey(d => d.NguoiTao)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<CauHinhDht>(entity =>
        {
            entity.ToTable("CauHinhDHT");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.MaDongHoNavigation).WithMany(p => p.CauHinhDhts).HasForeignKey(d => d.MaDongHo);

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.CauHinhDhtNguoiCapNhatNavigations).HasForeignKey(d => d.NguoiCapNhat);

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.CauHinhDhtNguoiTaoNavigations)
                .HasForeignKey(d => d.NguoiTao)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<DongHoTong>(entity =>
        {
            entity.ToTable("DongHoTong");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.Ma).HasMaxLength(50);
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Ten).HasMaxLength(255);

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.DongHoTongNguoiCapNhatNavigations).HasForeignKey(d => d.NguoiCapNhat);

            entity.HasOne(d => d.NguoiChinhSuaNavigation).WithMany(p => p.DongHoTongNguoiChinhSuaNavigations).HasForeignKey(d => d.NguoiChinhSua);

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.DongHoTongNguoiTaoNavigations)
                .HasForeignKey(d => d.NguoiTao)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<Dsdma>(entity =>
        {
            entity.ToTable("DSDMA");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.MaDma)
                .HasMaxLength(50)
                .HasColumnName("MaDMA");
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.TenDma)
                .HasMaxLength(255)
                .HasColumnName("TenDMA");
            entity.Property(e => e.TinhTrang)
                .HasMaxLength(50)
                .HasDefaultValue("Tot");
            entity.Property(e => e.TyLeNrwbanDau).HasColumnName("TyLeNRWBanDau");

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.DsdmaNguoiCapNhatNavigations).HasForeignKey(d => d.NguoiCapNhat);

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.DsdmaNguoiTaoNavigations)
                .HasForeignKey(d => d.NguoiTao)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<DsngayDocSoBilling>(entity =>
        {
            entity.ToTable("DSNgayDocSoBilling");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.DsngayDocSoBillingNguoiCapNhatNavigations).HasForeignKey(d => d.NguoiCapNhat);

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.DsngayDocSoBillingNguoiTaoNavigations)
                .HasForeignKey(d => d.NguoiTao)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<DsngayDocSoBillingChiTiet>(entity =>
        {
            entity.ToTable("DSNgayDocSoBillingChiTiet");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.MaNgayDocSoNavigation).WithMany(p => p.DsngayDocSoBillingChiTiets).HasForeignKey(d => d.MaNgayDocSo);

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.DsngayDocSoBillingChiTietNguoiCapNhatNavigations).HasForeignKey(d => d.NguoiCapNhat);

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.DsngayDocSoBillingChiTietNguoiTaoNavigations)
                .HasForeignKey(d => d.NguoiTao)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<NguoiDung>(entity =>
        {
            entity.ToTable("NguoiDung");

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
            entity.ToTable("NhatKySuDung");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.HanhDong).HasMaxLength(100);
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.TinhNang).HasMaxLength(255);

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.NhatKySuDungNguoiCapNhatNavigations).HasForeignKey(d => d.NguoiCapNhat);

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NhatKySuDungNguoiTaoNavigations)
                .HasForeignKey(d => d.NguoiTao)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.TenNguoiDungNavigation).WithMany(p => p.NhatKySuDungTenNguoiDungNavigations).HasForeignKey(d => d.TenNguoiDung);
        });

        modelBuilder.Entity<NhomNguoiDung>(entity =>
        {
            entity.ToTable("NhomNguoiDung");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NhomNguoiDung1)
                .HasMaxLength(255)
                .HasColumnName("NhomNguoiDung");

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.NhomNguoiDungNguoiCapNhatNavigations).HasForeignKey(d => d.NguoiCapNhat);

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NhomNguoiDungNguoiTaoNavigations)
                .HasForeignKey(d => d.NguoiTao)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<NrwcongTy>(entity =>
        {
            entity.ToTable("NRWCongTy");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.Ma)
                .HasMaxLength(50)
                .HasDefaultValue("CongTy");
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NguyenNhan).HasMaxLength(500);
            entity.Property(e => e.SoNgayDocSoDht).HasColumnName("SoNgayDocSoDHT");

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.NrwcongTyNguoiCapNhatNavigations).HasForeignKey(d => d.NguoiCapNhat);

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NrwcongTyNguoiTaoNavigations)
                .HasForeignKey(d => d.NguoiTao)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<NrwcongTyDauVaoChiTiet>(entity =>
        {
            entity.ToTable("NRWCongTyDauVaoChiTiet");

            entity.Property(e => e.GhiChu).HasMaxLength(255);
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao).HasColumnType("datetime");
            entity.Property(e => e.Nguon).HasMaxLength(100);
            entity.Property(e => e.ToanTu).HasMaxLength(10);

            entity.HasOne(d => d.MaDauVaoNavigation).WithMany(p => p.NrwcongTyDauVaoChiTiets).HasForeignKey(d => d.MaDauVao);

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.NrwcongTyDauVaoChiTietNguoiCapNhatNavigations).HasForeignKey(d => d.NguoiCapNhat);

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NrwcongTyDauVaoChiTietNguoiTaoNavigations)
                .HasForeignKey(d => d.NguoiTao)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<NrwcongTyTieuThuChiTiet>(entity =>
        {
            entity.ToTable("NRWCongTyTieuThuChiTiet");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Nguon).HasMaxLength(255);
            entity.Property(e => e.ToanTu).HasMaxLength(10);

            entity.HasOne(d => d.MaTieuThuNavigation).WithMany(p => p.NrwcongTyTieuThuChiTiets).HasForeignKey(d => d.MaTieuThu);

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.NrwcongTyTieuThuChiTietNguoiCapNhatNavigations).HasForeignKey(d => d.NguoiCapNhat);

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NrwcongTyTieuThuChiTietNguoiTaoNavigations)
                .HasForeignKey(d => d.NguoiTao)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<Nrwdma>(entity =>
        {
            entity.ToTable("NRWDMA");

            entity.Property(e => e.GhiChu).HasMaxLength(255);
            entity.Property(e => e.MaDma).HasColumnName("MaDMA");
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.NguyenNhan).HasMaxLength(255);

            entity.HasOne(d => d.MaDmaNavigation).WithMany(p => p.Nrwdmas).HasForeignKey(d => d.MaDma);

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.NrwdmaNguoiCapNhatNavigations).HasForeignKey(d => d.NguoiCapNhat);

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NrwdmaNguoiTaoNavigations)
                .HasForeignKey(d => d.NguoiTao)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<NrwdmadauVaoChiTiet>(entity =>
        {
            entity.ToTable("NRWDMADauVaoChiTiet");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.MaDma).HasColumnName("MaDMA");
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Nguon).HasMaxLength(255);
            entity.Property(e => e.ToanTu).HasMaxLength(10);

            entity.HasOne(d => d.MaDauVaoNavigation).WithMany(p => p.NrwdmadauVaoChiTiets).HasForeignKey(d => d.MaDauVao);

            entity.HasOne(d => d.MaDmaNavigation).WithMany(p => p.NrwdmadauVaoChiTiets).HasForeignKey(d => d.MaDma);

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.NrwdmadauVaoChiTietNguoiCapNhatNavigations).HasForeignKey(d => d.NguoiCapNhat);

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NrwdmadauVaoChiTietNguoiTaoNavigations)
                .HasForeignKey(d => d.NguoiTao)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<NrwdmatieuThuChiTiet>(entity =>
        {
            entity.ToTable("NRWDMATieuThuChiTiet");

            entity.Property(e => e.GhiChu).HasMaxLength(500);
            entity.Property(e => e.MaDma).HasColumnName("MaDMA");
            entity.Property(e => e.NgayCapNhat).HasColumnType("datetime");
            entity.Property(e => e.NgayTao)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Nguon).HasMaxLength(255);
            entity.Property(e => e.ToanTu).HasMaxLength(10);

            entity.HasOne(d => d.MaDmaNavigation).WithMany(p => p.NrwdmatieuThuChiTiets).HasForeignKey(d => d.MaDma);

            entity.HasOne(d => d.MaTieuThuNavigation).WithMany(p => p.NrwdmatieuThuChiTiets).HasForeignKey(d => d.MaTieuThu);

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.NrwdmatieuThuChiTietNguoiCapNhatNavigations).HasForeignKey(d => d.NguoiCapNhat);

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.NrwdmatieuThuChiTietNguoiTaoNavigations)
                .HasForeignKey(d => d.NguoiTao)
                .OnDelete(DeleteBehavior.ClientSetNull);
        });

        modelBuilder.Entity<PhanQuyenDuLieu>(entity =>
        {
            entity.ToTable("PhanQuyenDuLieu");

            entity.Property(e => e.DuLieuNrwcongTy)
                .HasMaxLength(50)
                .HasColumnName("DuLieuNRWCongTy");
            entity.Property(e => e.DuLieuNrwdma).HasColumnName("DuLieuNRWDMA");

            entity.HasOne(d => d.NhomNguoiDungNavigation).WithMany(p => p.PhanQuyenDuLieus).HasForeignKey(d => d.NhomNguoiDung);
        });

        modelBuilder.Entity<PhanQuyenTinhNang>(entity =>
        {
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
            entity.Property(e => e.NguoiDung).HasMaxLength(20);
            entity.Property(e => e.NhatKySuDung).HasMaxLength(20);
            entity.Property(e => e.NhomNguoiDungTinhNang).HasMaxLength(20);
            entity.Property(e => e.NrwcongTy)
                .HasMaxLength(20)
                .HasColumnName("NRWCongTy");
            entity.Property(e => e.Nrwdma)
                .HasMaxLength(20)
                .HasColumnName("NRWDMA");
            entity.Property(e => e.PhanQuyen).HasMaxLength(20);

            entity.HasOne(d => d.NguoiCapNhatNavigation).WithMany(p => p.PhanQuyenTinhNangNguoiCapNhatNavigations).HasForeignKey(d => d.NguoiCapNhat);

            entity.HasOne(d => d.NguoiTaoNavigation).WithMany(p => p.PhanQuyenTinhNangNguoiTaoNavigations)
                .HasForeignKey(d => d.NguoiTao)
                .OnDelete(DeleteBehavior.ClientSetNull);

            entity.HasOne(d => d.NhomNguoiDungNavigation).WithMany(p => p.PhanQuyenTinhNangs).HasForeignKey(d => d.NhomNguoiDung);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
