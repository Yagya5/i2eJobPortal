using DomainModel.AuditTrails;
using DomainModel.ContactQueries;
using DomainModel.Users;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace Services.AuditTrails
{
    public interface IAuditTrailServices
    {
        bool InsertAuditTrail(int TaskId, string Module, string Action, HttpContext context, Object OldObject, Object NewObject);

        IEnumerable<AuditTrail> GetAuditTrail();

        bool InsertContactQuery(ContactQuery query, HttpContext context);

        IEnumerable<ContactQuery> GetContactQueries();

    }
}
