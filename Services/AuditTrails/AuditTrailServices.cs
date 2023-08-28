using DomainModel.AuditTrails;
using Microsoft.AspNetCore.Http;
using Repository.AuditTrails;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using static Microsoft.CodeAnalysis.AssemblyIdentityComparer;

namespace Services.AuditTrails
{
    public class AuditTrailServices : IAuditTrailServices
    {
        private readonly IAuditTrailRepository _auditTrailRepository;

        public AuditTrailServices(IAuditTrailRepository auditTrailRepository)
        {
            _auditTrailRepository = auditTrailRepository;
        }


        public bool InsertAuditTrail(int TaskId, string Module, string Action, HttpContext context, Object OldObject, Object NewObject)
        {                        
            var result = _auditTrailRepository.InsertAuditTrail(TaskId, Module, Action, context, OldObject, NewObject);
            return result;
        }
                
    }
}
