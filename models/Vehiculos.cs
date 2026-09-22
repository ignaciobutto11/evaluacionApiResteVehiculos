namespace IgnacioButtoEvalucion.Models;

public class Vehiculos

{
    public int VehiculosId { get; set; }
    public required string Marca { get; set; }
    public required string Modelo { get; set; }
    public required string Año { get; set; }
    public required string Patente { get; set; }
    public required string Km { get; set; }
    public required string FechaDeIngreso { get; set; }
    public Boolean Disponible { get; set; }
}