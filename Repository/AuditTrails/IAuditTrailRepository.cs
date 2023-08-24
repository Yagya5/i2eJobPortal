using DomainModel.AuditTrails;
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
        bool InsertAuditTrail(int TaskId, string Module, string Action, HttpContext context, Object OldObject, Object NewObject);
    }
}
