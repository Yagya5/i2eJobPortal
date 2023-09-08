using DomainModel.AuditTrails;
using DomainModel.ContactQueries;
using Microsoft.AspNetCore.Http;
using Repository.AuditTrails;
using System;
using System.Collections;
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

        public IEnumerable<AuditTrail> GetAuditTrail()
        {
            var result = _auditTrailRepository.GetAuditTrail();
            return result;
        }        

        public bool InsertAuditTrail(int TaskId, string Module, string TableName, string Action, HttpContext context, Object OldObject, Object NewObject)
        {                        
            var result = _auditTrailRepository.InsertAuditTrail(TaskId, Module, TableName, Action, context, OldObject, NewObject);
            return result;
        }

        public bool InsertContactQuery(ContactQuery query, HttpContext context)
        {
            var result = _auditTrailRepository.InsertContactQuery(query, context);
            return result;
        }

        public IEnumerable<ContactQuery> GetContactQueries()
        {
            var result = _auditTrailRepository.GetContactQueries();
            return result;
        }
    }
}
