using DomainModel.AuditTrails;
using DomainModel.ContactQueries;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.AuditTrails
{
    public interface IAuditTrailRepository
    {
        bool InsertAuditTrail(int TaskId, string Module, string TableName, string Action, HttpContext context, Object OldObject, Object NewObject); // It will insert detail about User & various changes he has done in record, into Table_AuditTrail

        IEnumerable<AuditTrail> GetAuditTrail(); // Fetch the User Activities which has been audited

        bool InsertContactQuery(ContactQuery query, HttpContext context); // It will insert contact-form data into Table_ContactQueries

        IEnumerable<ContactQuery> GetContactQueries();  // It will fetch Table_ContactQueries records
    }
}
