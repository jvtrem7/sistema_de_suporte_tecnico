using SuporteTecnico.Dominio;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SuporteTecnico.Service
{
    public class ChamadoService : IChamadoService
    {
        private readonly IChamadoRepository _repo;

        public ChamadoService(IChamadoRepository repo)
        {
            _repo = repo;
        }

        public Task<Chamado> CreateAsync(Chamado c) => _repo.AddAsync(c);

        public Task<bool> DeleteAsync(int id) => _repo.DeleteAsync(id);

        public Task<IEnumerable<Chamado>> GetAllAsync() => _repo.GetAllAsync();

        public Task<Chamado?> GetByIdAsync(int id) => _repo.GetByIdAsync(id);

        public Task<IEnumerable<Chamado>> GetByStatusAsync(string status) => _repo.GetByStatusAsync(status);

        // ✅ Implementação corrigida
        public async Task<IEnumerable<Chamado>> ListarChamados()
        {
            // Aqui você pode colocar regras de negócio, se desejar (ex: ordenar, filtrar etc.)
            var chamados = await _repo.GetAllAsync();
            return chamados;
        }

        public Task<Chamado?> UpdateAsync(Chamado c) => _repo.UpdateAsync(c);
    }
}
