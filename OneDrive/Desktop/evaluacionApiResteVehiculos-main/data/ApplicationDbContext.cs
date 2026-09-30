using Microsoft.EntityFrameworkCore;
using Vehiculo.Models;

namespace Vehiculo.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Vehiculos> Vehiculos { get; set; }
}