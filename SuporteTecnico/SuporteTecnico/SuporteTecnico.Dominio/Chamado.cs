namespace SuporteTecnico.Dominio
{
    public class Chamado
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string Descricao { get; set; } = string.Empty;
        public string Status { get; set; } = "Aberto";
        public DateTime DataAbertura { get; set; } = DateTime.UtcNow;
        public DateTime? DataFechamento { get; set; }

        // Enum Setor
        public Setor Setor { get; set; }
    }

    public enum Setor
    {
        Coordenação,
        Secretaria,
        Direção,
        RH
    }
}
