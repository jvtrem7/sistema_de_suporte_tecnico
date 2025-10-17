using SuporteTecnico.Dominio;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SuporteTecnico.Service
{
    public interface IChamadoService
    {
        // Retorna todos os chamados
        Task<IEnumerable<Chamado>> GetAllAsync();

        // Busca um chamado pelo ID
        Task<Chamado?> GetByIdAsync(int id);

        // Cria um novo chamado
        Task<Chamado> CreateAsync(Chamado c);

        // Atualiza um chamado existente
        Task<Chamado?> UpdateAsync(Chamado c);

        // Exclui um chamado pelo ID
        Task<bool> DeleteAsync(int id);

        // Retorna chamados por status (ex: "aberto", "fechado")
        Task<IEnumerable<Chamado>> GetByStatusAsync(string status);

        // ✅ Corrigido — agora retorna uma lista de chamados
        Task<IEnumerable<Chamado>> ListarChamados();
    }
}
