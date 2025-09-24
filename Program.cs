using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using WebAPI_NRW.Helpers;
using WebAPI_NRW.Models.Database;
using WebAPI_NRW.Services;
using WebAPI_NRW.Settings;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();

// Đăng ký PermissionService cho DI
builder.Services.AddScoped<IPermissionService, PermissionService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    // Add JWT Bearer authorization to Swagger
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Scheme = "bearer",
        BearerFormat = "JWT",
        Type = SecuritySchemeType.Http,
        Description = "JWT Authorization header using the Bearer scheme."
    });

    options.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] { }
        }
    });
});

// Connection Database
builder.Services.AddDbContext<DbNrwContext>(options =>
options.UseSqlServer(builder.Configuration.GetConnectionString("ConnectServer")));

var jwtSettings = builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>();

// Configure JWT authentication
builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings.Issuer,
        ValidAudience = jwtSettings.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey))
    };
});

// Dùng hardcore
//builder.Services.AddSingleton<JwtHelper>(new JwtHelper(
//    secretKey: "your_secret_key_your_secret_key_your_secret_key_your_secret_keyyour_secret_key_your_secret_key_your_secret_key_your_secret_key",
//    issuer: "you_issuer",
//    audience: "you_audience"
//));

// Đăng ký JwtHelper để tạo token
builder.Services.AddSingleton(new JwtHelper(
    jwtSettings.SecretKey,
    jwtSettings.Issuer,
    jwtSettings.Audience
));

var app = builder.Build();
// Sau khi build app
//using (var scope = app.Services.CreateScope())
//{
//    UpdateRawPasswordsToHash(scope.ServiceProvider);
//}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();


// ---------------------
// Hàm cập nhật mật khẩu raw sang hash
// ---------------------
//void UpdateRawPasswordsToHash(IServiceProvider services)
//{
//    using var scope = services.CreateScope();
//    var context = scope.ServiceProvider.GetRequiredService<DbNrwContext>();

//    var users = context.NguoiDungs.ToList();

//    foreach (var user in users)
//    {
//        // Chỉ hash nếu chưa hash (ví dụ: độ dài < 50 ký tự)
//        if (!string.IsNullOrWhiteSpace(user.MatKhau) && user.MatKhau.Length < 50)
//        {
//            Console.WriteLine($"Cập nhật password cho user: {user.TenNguoiDung}");
//            user.MatKhau = PasswordHelper.HashPassword("123456");
//        }
//    }

//    context.SaveChanges();
//    Console.WriteLine("Cập nhật mật khẩu xong!");
//}