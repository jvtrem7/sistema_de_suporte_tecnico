using Microsoft.Extensions.DependencyInjection;
using SuporteTecnico.Dominio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SuporteTecnico.Repositorio
{
    public static class DependencyInjection
    {
        public static IServiceCollection AddRepositorio(this IServiceCollection services)
        {
            services.AddScoped<IChamadoRepository, ChamadoRepository>();
            // outros repos...
            return services;
        }
    }
}
