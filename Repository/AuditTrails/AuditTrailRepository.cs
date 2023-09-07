using Dapper;
using DomainModel.AuditLogins;
using DomainModel.AuditTrails;
using DomainModel.Common;
using DomainModel.ContactQueries;
using DomainModel.Users;
using KellermanSoftware.CompareNetObjects;
using Microsoft.AspNetCore.Http;
using Repository.Connection;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Security.Policy;
using System.Text;
using System.Threading.Tasks;

namespace Repository.AuditTrails
{
    public class AuditTrailRepository : IAuditTrailRepository
    {
        private readonly IDapperConnection _dapperConnection;
        private readonly string _schemaName;

        public AuditTrailRepository(IDapperConnection dapperConnection)  // Class constructor & Dependency Injection
        {
            _dapperConnection = dapperConnection;
            _schemaName = _dapperConnection.GetDatabaseSchemaName();
        }

        public IEnumerable<AuditTrail> GetAuditTrail()  // Fetch the User Activities which has been audited
        {
            IEnumerable<AuditTrail> result = new List<AuditTrail>();
            using var connection = _dapperConnection.CreateConnection();
            string Query = "SELECT * FROM v_AuditTrail order by DateTimeStamp desc";
            result = connection.Query<AuditTrail>(Query, null, null, true, 0, null);
            return result;
        }       

        public bool InsertAuditTrail(int TaskId, string Module, string Action, HttpContext context, Object OldObject, Object NewObject) // It will insert detail about User & various changes he has done in record, into Table_AuditTrail
        {   
            int UserId = int.Parse(context.User.FindFirst(claim => claim.Type == System.Security.Claims.ClaimTypes.NameIdentifier)?.Value);                        
            string Url = context.Request.Path.Value;
            CompareLogic compObjects = new CompareLogic();
            compObjects.Config.MaxDifferences = 99;
            ComparisonResult compResult = compObjects.Compare(OldObject, NewObject);

            if(compResult.Differences.Count != 0)
            {
                for(int Index = 0; Index < compResult.Differences.Count; Index++)
                {
                    string DataField = compResult.Differences[Index].PropertyName;
                    string OldValue = compResult.Differences[Index].Object1Value;
                    string NewValue = compResult.Differences[Index].Object2Value;
                    using var connection = _dapperConnection.CreateConnection();
                    var param = new DynamicParameters();
                    param.Add(nameof(AuditTrail.UserId), UserId);
                    param.Add(nameof(AuditTrail.TaskId), TaskId);
                    param.Add(nameof(AuditTrail.OldValue), OldValue);
                    param.Add(nameof(AuditTrail.NewValue), NewValue);
                    param.Add(nameof(AuditTrail.DataField), DataField);
                    param.Add(nameof(AuditTrail.Module), Module);
                    param.Add(nameof(AuditTrail.Url), Url);
                    param.Add(nameof(AuditTrail.Action), Action);
                    connection.Execute(Constant.InsertAuditTrailStoredProcedure, param, null, 0, CommandType.StoredProcedure);
                }                
                return true;
            }
            else
            {
                return false;
            }            
        }

        public bool InsertContactQuery(ContactQuery query, HttpContext context) // It will insert contact-form data into Table_ContactQueries
        {
            int result = 0;
            using var connection = _dapperConnection.CreateConnection();
            var param = new DynamicParameters();
            param.Add(nameof(ContactQuery.FirstName), query.FirstName);
            param.Add(nameof(ContactQuery.LastName), query.LastName);
            param.Add(nameof(ContactQuery.Email), query.Email);
            param.Add(nameof(ContactQuery.Phone), query.Phone);
            param.Add(nameof(ContactQuery.Message), query.Message);
            param.Add(nameof(ContactQuery.IPAddress), context.Connection.LocalIpAddress.ToString());
            result = connection.Execute("spInsertContactQuery", param, null, 0, CommandType.StoredProcedure);
            if (result != 0)
            {
                return true;
            }
            else
                return false;
        }

        public IEnumerable<ContactQuery> GetContactQueries() // It will fetch Table_ContactQueries records
        {
            IEnumerable<ContactQuery> result = new List<ContactQuery>();
            using var connection = _dapperConnection.CreateConnection();
            string Query = "SELECT * FROM v_ContactQueries order by DateTimeStamp desc";
            result = connection.Query<ContactQuery>(Query, null, null, true, 0, null);
            return result;
        }
    }
}
