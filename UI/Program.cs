using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.Extensions.Options;
using Repository.AuditTrails;
using Repository.AppliedJobs;
using Repository.Connection;
using Repository.EditAdminFullDetails;
using Repository.Jobs;
using Repository.RegisteredJobSeekers;
using Repository.Users;
using Services.AuditTrails;
using Services.EditAdminFullDetails;
using Services.AppliedJobs;
using Services.Jobs;
using Services.RegisteredJobSeekers;
using Services.Users;
using DNTCaptcha.Core;
using Repository.AdminDashboard;
using Services.AdminDashboard;

namespace i2eJobPortal
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            var connectionString = builder.Configuration.GetConnectionString("DefaultConnection") ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

            // Add services to the container.
            //builder.Services.AddControllersWithViews(Options =>
            //{
            //    Options.Filters.Add(typeof(AuditTrailFilter));
            //});

            builder.Services.AddControllersWithViews();

            builder.Services.AddMvc().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

            // Add the memory cache services.
            builder.Services.AddMemoryCache();
            builder.Services.AddSession();

            builder.Services.AddAuthentication(CookieAuthenticationDefaults.AuthenticationScheme).AddCookie(options =>
            {
                options.Cookie.Name = "Cookie";
                options.ExpireTimeSpan = TimeSpan.FromMinutes(25);
                options.SlidingExpiration = true;
                
            });

            builder.Services.AddDNTCaptcha(option =>
            {
                option.UseCookieStorageProvider().ShowThousandsSeparators(false);
                option.WithEncryptionKey("abdDFKDFDFjkjkdfj121212");
            });

            builder.Services.AddSingleton<IDapperConnection>(new DapperConnection(builder.Configuration, "DefaultConnection"));
            builder.Services.AddTransient<IUserRepository, UserRepository>();
            builder.Services.AddTransient<IUserServices, UserServices>();

            builder.Services.AddTransient<IAuditTrailRepository, AuditTrailRepository>();
            builder.Services.AddTransient<IAuditTrailServices, AuditTrailServices>();

            builder.Services.AddTransient<IRegisteredJobSeekersRepository, RegisteredJobSeekersRepository>();
            builder.Services.AddTransient<IRegisteredJobSeekersServices, RegisteredJobSeekersServices>();

            builder.Services.AddTransient<IEditUserFullDetailsRepository, EditUserFullDetailsRepository>();
            builder.Services.AddTransient<IEditUserFullDetailsServices, EditUserFullDetailsServices>();

            builder.Services.AddTransient<IEditAdminFullDetailsRepository, EditAdminFullDetailsRepository>();
            builder.Services.AddTransient<IEditAdminFullDetailsServices, EditAdminFullDetailsServices>();

            builder.Services.AddTransient<IAppliedJobsRepository, AppliedJobsRepository>();
            builder.Services.AddTransient<IAppliedJobsServices, AppliedJobsServices>();

            builder.Services.AddTransient<IJobRepository, JobRepository>();
            builder.Services.AddTransient<IJobServices, JobServices>();
            builder.Services.AddTransient<IAdminDashBoardRepository,AdminDashboardRepository>();
            builder.Services.AddTransient<IAdminDashboardServices, AdminDashboardServices>();

            builder.Services.AddRazorPages().AddRazorRuntimeCompilation();

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (!app.Environment.IsDevelopment())
            {
                app.UseExceptionHandler("/Home/Error");
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.Use(async (context, next) =>
            {
                await next();
                if (context.Response.StatusCode == 404)
                {
                    context.Request.Path = "/Home";
                    await next();
                }
            });

            app.UseHttpsRedirection();

            app.UseStaticFiles();

            app.UseRouting();

            app.UseAuthentication();

            app.UseAuthorization();


            app.UseEndpoints(endpoints =>
            {
                endpoints.MapAreaControllerRoute(
                    name: "Admin",
                    areaName: "Admin",
                    pattern: "Admin/{controller=AdminDashboard}/{action=Index}"
                );

                endpoints.MapControllerRoute(
                    name: "areaRoute",
                    pattern: "{area:exists}/{controller}/{action}"
                );

                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}"
                );

            });   


            app.MapRazorPages();

            app.Run();
        }
    }
}