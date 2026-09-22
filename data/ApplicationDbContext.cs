using Microsoft.EntityFrameworkCore;
using IgnacioButtoEvalucion.Models;

namespace IgnacioButtoEvalucion.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<Vehiculos> Vehiculos { get; set; 
    }
    }
    