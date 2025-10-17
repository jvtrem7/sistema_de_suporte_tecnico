using Microsoft.EntityFrameworkCore;
using SuporteTecnico.Dominio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuporteTecnico.Repositorio
{
    public class ChamadoRepository : GenericRepository<Chamado>, IChamadoRepository
    {
        public ChamadoRepository(AppDbContext context) : base(context) { }

        public async Task<IEnumerable<Chamado>> GetByStatusAsync(string status) =>
            await _dbSet.Where(c => c.Status == status).ToListAsync();

        public async Task<Chamado> AddAsync(Chamado c)
        {
            _context.Chamados.Add(c);
            await _context.SaveChangesAsync();
            return c;
        }
    }
}
