namespace Vehiculo.Models;

public class Vehiculos
{
    public int VehiculosId { get; set; }
    public required string Marca { get; set; }
    public required string Modelo { get; set; }
    public required int Año { get; set; }
    public required string Patente { get; set; }
    public required int Km { get; set; }
    public required DateOnly FechaDeIngreso { get; set; }
    public Boolean Disponible { get; set; }
}