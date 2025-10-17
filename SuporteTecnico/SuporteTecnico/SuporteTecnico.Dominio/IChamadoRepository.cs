using SuporteTecnico.Dominio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuporteTecnico.Dominio
{
    public interface IChamadoRepository : IRepository<Chamado>
    {
        Task<IEnumerable<Chamado>> GetByStatusAsync(string status);
    }
}
