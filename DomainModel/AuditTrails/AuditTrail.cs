using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DomainModel.AuditTrails
{
    public class AuditTrail
    {
        public int? UserId { get; set; }

        public int? TaskId { get; set; }       

        public string? OldValue { get; set; }

        public string? NewValue { get; set; }

        public string? DataField { get; set; }

        public string? Module { get; set; }

        public string? Url { get; set; }       

        public String? Action { get; set; }

        public DateTime DateTimeStamp { get; set; }

    }


    public static class AuditAction
    {
        public const string  Modified = "Modified", Insert = "Insert";

    }


        public class AuditChange
    {
        public string DateTimeStamp { get; set; }        
        public string AuditActionTypeName { get; set; }
        public List<AuditDelta> Changes { get; set; }
        public AuditChange()
        {
            Changes = new List<AuditDelta>();
        }
    }

    public class AuditDelta
    {
        public string FieldName { get; set; }
        public string ValueBefore { get; set; }
        public string ValueAfter { get; set; }
    }
}
